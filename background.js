// background.js - Wiki to Grok Extension Service Worker
// Phase 3: User Control - toggle, badge, state persistence

const RULESET_ID = 'wikipedia_redirect';
const LOG_PREFIX = '[Wiki to Grok]';

// Immediate log on script load
console.log(LOG_PREFIX, 'Service worker loaded at:', new Date().toISOString());

// Restore badge state on service worker startup (top-level)
chrome.storage.local.get(['enabled']).then(({ enabled }) => {
  const isEnabled = enabled !== false; // Default to true
  updateBadge(isEnabled);
  console.log(LOG_PREFIX, 'Service worker started, state:', isEnabled ? 'ON' : 'OFF');
});

// Handle first install and updates
chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  console.log(LOG_PREFIX, 'Extension event:', reason);

  if (reason === 'install') {
    // First install: enable by default
    await applyState(true);
    console.log(LOG_PREFIX, 'Extension installed, enabled by default');
  } else if (reason === 'update') {
    // Restore user's preference after update (don't reset to manifest default)
    const { enabled } = await chrome.storage.local.get(['enabled']);
    const isEnabled = enabled !== false;
    await applyState(isEnabled);
    console.log(LOG_PREFIX, 'Extension updated, restored state:', isEnabled ? 'ON' : 'OFF');
  }
});

// Toggle on toolbar click (top-level registration - CRITICAL)
chrome.action.onClicked.addListener(async (tab) => {
  const { enabled } = await chrome.storage.local.get(['enabled']);
  const newState = enabled === false; // Toggle: false->true, undefined/true->false
  await applyState(newState);
  console.log(LOG_PREFIX, 'Toggled to:', newState ? 'ON' : 'OFF');
});

// Apply state to storage, badge, and ruleset
async function applyState(enabled) {
  // 1. Persist to storage (source of truth)
  await chrome.storage.local.set({ enabled });

  // 2. Update badge display
  await updateBadge(enabled);

  // 3. Update ruleset
  await chrome.declarativeNetRequest.updateEnabledRulesets({
    enableRulesetIds: enabled ? [RULESET_ID] : [],
    disableRulesetIds: enabled ? [] : [RULESET_ID]
  });
}

// Update badge display
async function updateBadge(enabled) {
  await chrome.action.setBadgeText({ text: enabled ? 'ON' : 'OFF' });
  await chrome.action.setBadgeBackgroundColor({
    color: enabled ? '#4CAF50' : '#9E9E9E' // Green for on, gray for off
  });
}
