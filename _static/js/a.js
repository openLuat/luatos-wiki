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

    //评论区
    $(".related-pages").after("<div id='wiki-comments'></div>");

    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = "https://cdn.openluat-luatcommunity.openluat.com/attachment/20211222131030801_Artalk[1].css";
    head.appendChild(link);

    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "https://cdn.openluat-luatcommunity.openluat.com/attachment/20211222131045036_Artalk[1].js";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();

    var commitCheckInterval;
    commitCheckInterval = setInterval(function () {
        if (typeof (Artalk) == "undefined") {
            return;
        }
        new Artalk({
            el: '#wiki-comments',
            server: 'https://pi.wvvwvw.com:2096/api/',
            site: 'LuatOS WIKI',
        });
        clearInterval(commitCheckInterval);
    }, 100);
    //评论区end

    if(oldonload != undefined)
        oldonload();
}

if (window.location.protocol != "https:" && window.location.protocol != "file:"){
    window.location.href = "https:" +  window.location.href.substring(window.location.protocol.length);
}
