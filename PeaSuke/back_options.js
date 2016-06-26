//後でjQueryに書き換えよう
// Saves options to chrome.storage
function save_options() {
    
    var uiHidenNotify = document.getElementById('uiHidenNotify').checked;
    var uiHiddenUserId = document.getElementById('uiHiddenUserId').value;
    var uiNotifyOn = document.getElementById('uiNotifyOn').checked;
  chrome.storage.sync.set({
    uiDisNotify: uiDisNotify,
    uiNotifyOn: uiNotifyOn,
    uiHiddenUserId: uiHiddenUserId
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = '保存しました';
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
    uiHidenNotify: false,
    uiHiddenUserId:null,
    uiNotifyOn: false
  }, function(items) {
    document.getElementById('uiHidenNotify').checked = items.uiHidenNotify;
    document.getElementById('uiHiddenUserId').value = items.uiHiddenUserId;
    document.getElementById('uiNotifyOn').checked = items.uiNotifyOn;

  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
