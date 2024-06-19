require.config({ paths: { 'vs': 'vs' } });
require(['vs/editor/editor.main'], function () {
    var snippets = [];
    $.get("vs/snippet.json", function (result) {
        var j;
        if(typeof(result)=="object")
            j = result;
        else
            j= JSON.parse(result);
        for (var i in j) {
            snippets.push({
                l: j[i].prefix,
                t: j[i].body,
                d: j[i].description,
            });
        }
    });

    monaco.languages.registerCompletionItemProvider('lua', {
        provideCompletionItems: function(model, position) {
            // get editor content before the pointer
            var textUntilPosition = model.getValueInRange({
                startLineNumber: position.lineNumber,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column
            });
            var suggestions = [];
            for (let i = 0; i < snippets.length; i++) {
                if(snippets[i].l.indexOf(textUntilPosition) == 0) {
                    suggestions.push({
                        label: snippets[i].l,
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        insertText: snippets[i].t,
                        detail: snippets[i].d,
                    });
                }
            }
            return {
                suggestions
            };
        }
    });

    if (location.search != ""){
        var scode = location.search.substring(1);
        if (scode.indexOf("&") >= 0)
            scode = scode.substring(0,scode.indexOf("&"))
        defaultCode = unescape(scode);
    }

    var editor = monaco.editor.create(document.getElementById('container'), {
        value: defaultCode,
        language: 'lua',
        renderWhitespace: "all",
        fontFamily: "'Sarasa Mono SC','Cascadia Code','Fira Code','iosevka','Hasklig','Consolas','微软雅黑','Courier New', monospace",
        fontSize: 15,
        emptySelectionClipboard: false,
        mouseWheelZoom: true,
        fontLigatures: true,
    });
    $("#code-run").click(function () {
        runCode(editor.getValue());
    });
    $("#code-stop").click(function () {
        stopCode();
    });
    $("#code-reset").click(function () {
        stopCode();
        runCode(editor.getValue());
    });

    var shareButton = document.getElementById("code-share");
    var pageurl = window.location.href;
    if (pageurl.indexOf("?") >= 0)
        pageurl = pageurl.substring(0, pageurl.indexOf("?"));
    $("#code-share").click(function () {
        var url = pageurl + "?" + escape(editor.getValue()) + "%0d%0a";
        shareButton.setAttribute("data-clipboard-text", url);
        $.ajax({
            type: 'POST',contentType : "application/json",
            url: "https://xn--ugt.cc/api/set.php",
            data: JSON.stringify({url:url}),
            success: function(result){
                if(result.success)
                alert("也可以使用短链接分享："+result.content.url);
            },
            dataType: 'json'
        });
    });
    var btn = document.getElementById('code-share');
    var clipboard = new ClipboardJS(btn);

    clipboard.on('success', function (e) {
        alert("复制成功~粘贴即可分享代码链接~");
    });
    clipboard.on('error', function (e) {
        alert("复制失败了呢，你还是手动复制吧");
    });


    $(function () {
        $(document).keydown(function (event) {
            if (event.keyCode == 116) {
                stopCode();
                runCode(editor.getValue());
            }
        });
    });
});
