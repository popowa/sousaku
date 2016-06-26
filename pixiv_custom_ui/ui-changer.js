//options.jsの方にマージして削除する
$(document).ready(function(){
  chrome.storage.sync.get({
    uiHidenNotify: false,
    uiHiddenUserId: null,
    uiNotifyOn:false
  }, function(items) {
    var userIds = null;
    $("a.user").each(function(){
        userIds = $(this).attr('data-user_id');
        if(userIds == items.uiHiddenUserId){
            $(this).parent().remove();
            console.log(userIds);
        }
    });
    if(items.uiHidenNotify == true){
        $('.notifications').remove();
    }
    if (items.uiNotifyOn == true){
        $('.pinboard a').addClass("unread");
    }
  });
});
