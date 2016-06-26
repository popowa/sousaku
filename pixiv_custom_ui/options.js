$(document).ready(function(){
    restore_options();
});
// stored in chrome.storage.
$("#save").click(function () {
    save_options();
});
$("#clear").click(function(){
    chrome.storage.sync.clear();
    $('.options').find('input:text').val('');
    $('.options').find('input:checkbox').prop("checked",false);
    $('#status').append('オプションをクリアしました。ページのリロードをして下さい。');
    setTimeout(function(){
         $('#status').text("").faceOut("slow");
    },1200);

});

function save_options() {
    var uiNotifyOn = $('#uiNotifyOn').prop("checked");
    var uiNotifyOnNum = $.isNumeric($('#uiNotifyOnNum').val())? $('#uiNotifyOnNum').val() : 5;
    var uiNotifyOff = $('#uiNotifyOff').prop("checked");
    var uiUserIdHidden = $('#uiUserIdHidden').val();
    var uiBKMOff = $('#uiBKMOff').prop("checked");
    var uiScoreOff = $('#uiScoreOff').prop("checked");
    chrome.storage.sync.set({
      uiNotifyOff: uiNotifyOff,
      uiNotifyOnNum:uiNotifyOnNum,
      uiNotifyOn: uiNotifyOn,
      uiUserIdHidden: uiUserIdHidden,
      uiBKMOff: uiBKMOff,
      uiScoreOff: uiScoreOff
    }, function() {
        $('#status').append('保存しました');
        restore_options();
        setTimeout(function(){
             $('#status').text("");
        },1200);
    });
};

function restore_options(){
    chrome.storage.sync.get({
      uiNotifyOn: false,
      uiNotifyOnNum: null,
      uiNotifyOff:false,
      uiUserIdHidden: null,
      uiBKMOff: false,
      uiScoreOff: false
    }, function(items) {
        $('#uiNotifyOn').prop("checked", items.uiNotifyOn);
        $('#uiNotifyOnNum').val(items.uiNotifyOnNum);
        if(items.uiNotifyOn == true){
            $('.popboard>a').addClass('unread');
            $('span.count').html(items.uiNotifyOnNum);
        };
        $('#uiNotifyOff').prop("checked", items.uiNotifyOff);
        if(items.uiNotifyOff == true){
            $('.notifications').remove();
        };
        $('#uiUserIdHidden').val(items.uiUserIdHidden);
        if(items.uiUserIdHidden !== null){
            var uiUserIdArray = items.uiUserIdHidden.split(',');
            $.each(uiUserIdArray, function(index, eachUserId){
                var userIds = null;
                $("a.user").each(function(){
                    userIds = $(this).attr('data-user_id');
                    eachUserId = $.trim(eachUserId);
                    if(userIds == eachUserId){
                        $(this).parent().remove();
                    };
                });
            });
        };
        $('#uiBKMOff').prop("checked", items.uiBKMOff);
        if(items.uiBKMOff == true){
            $(".bookmark-count").each(function(){
                $(this).html("♥");
            });
        };
        $('#uiScoreOff').prop("checked", items.uiScoreOff);
            if(items.uiScoreOff == true){
                $('.score').remove();
            };
    });
};
