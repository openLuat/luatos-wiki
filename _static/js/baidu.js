var clarity_id = "6bo66yvxk8";

//在英文站
if (location.href.indexOf("https://wiki.luatos.org") == 0 ) {
  clarity_id = "jm1w1beqoi";

  //Google Analytics
  (function() {
    var g_js = document.createElement("script");
    g_js.src = "https://www.googletagmanager.com/gtag/js?id=G-JLYVYP605V";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(g_js, s);
  })();
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-JLYVYP605V');
}
else//在中文站
{
  //百度统计
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?129c4539d58d0fff6a4695c52a5bcde5";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
}

(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", clarity_id);
