//後でjQueryに書き換えよう
// Saves options to chrome.storage
function save_options() {
    var uiNotifyOn = $('#uiNotifyOn').prop("checked");
    var uiNotifyOff = $('#uiNotifyOff').prop("checked");
    var uiUserIdHidden = $('#uiUserIdHidden').val();
    chrome.storage.sync.set({
      uiNotifyOff: uiNotifyOff,
      uiNotifyOn: uiNotifyOn,
      uiUserIdHidden: uiUserIdHidden
    }, function() {
    $('#status').append('保存しました');
    $('#status').faceOut("slow");
    });
};

function restore_options(){
    chrome.storage.sync.get({
      uiNotifyOn: false,
      uiNotifyOff:false,
      uiUserIdHidden: null
    }, function(items) {
    $('#uiNotifyOn').prop("checked", items.uiNotifyOn);
    $('#uiNotifyOff').prop("checked", items.uiNotifyOff);
    $('#uiUserIdHidden').val(items.uiUserIdHidden);
    });
};

// stored in chrome.storage.
$("#save").click(function () {
    save_options();
});
$(document).ready(function(){
    restore_options();
});
