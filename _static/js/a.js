window.onload = function () {
    //新窗口打开链接
    $("article").find("a").each(function () {
        if ($(this).attr("target") !== "_blank") {
            $(this).attr('target', '_blank');
        }
    });
    //表头宽度别改了
    $("col").css("width","");
    $(".highlight").css("background","#fafafa");
}
