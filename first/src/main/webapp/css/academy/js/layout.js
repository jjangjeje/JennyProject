$(document).ready(function(){
    //탭버튼 - 맛이야기 상세정보
    $(".tab-func-box > div").hide();
    $(".tab-func-box > div:first").show();
    $(".tab-func-btn li:first").addClass("on");

    $(".tab-func-btn li").click(function () {
        $(".tab-func-btn li").removeClass("on");
        $(this).addClass("on");
        $(".tab-func-box > div").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).show()
    });

});