//後でjQueryに書き換えよう
// Saves options to chrome.storage
function save_options() {
    var uiDisNotify = document.getElementById('uiDisNotify').checked;
  chrome.storage.sync.set({
    uiDisNotify: uiDisNotify
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    uiDisNotify: false,
  }, function(items) {
    document.getElementById('uiDisNotify').checked = items.uiDisNotify;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);
