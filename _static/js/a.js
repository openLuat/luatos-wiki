var oldonload = window.onload;
window.onload = function () {
    //新窗口打开链接
    $("article").find("a").each(function () {
        if ($(this).attr("href") != undefined &&
            ($(this).attr("href").indexOf("https://wiki.luatos.com") !== 0 || $(this).attr("href").indexOf("https://wiki.luatos.com/_static/") == 0) &&
            $(this).attr("href").indexOf("#") !== 0 &&
            $(this).attr("target") !== "_blank") {
            $(this).attr('target', '_blank');
        }
    });
    //表头宽度别改了
    $("col").css("width","");
    if(oldonload != undefined)
        oldonload();
}

if (window.location.protocol != "https:" && window.location.protocol != "file:"){
    //window.location.href = "https:" +  window.location.href.substring(window.location.protocol.length);
}
