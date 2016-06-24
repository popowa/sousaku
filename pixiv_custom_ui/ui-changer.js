$(document).ready(function(){
  chrome.storage.sync.get({
    uiDisNotify: false,
    test: true
  }, function(items) {
    console.log(items.uiDisNotify);
    if(items.uiDisNotify){
        $('.notifications').remove();
    }
  });
});
