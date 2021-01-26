window.onload = function () {
    //新窗口打开链接
    $(".content").find("a").each(function () {
        if ($(this).attr("target") !== "_blank") {
            $(this).attr('target', '_blank');
        }
    });
}
