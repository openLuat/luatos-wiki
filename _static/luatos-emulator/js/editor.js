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
                        documentation: snippets[i].description,
                    });
                }
            }
            return {
                suggestions
            };
        }
    });

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

    var code  = editor.getValue();

    $("#code-run").click(function () {
        runCode(editor.getValue());
    });
    $("#code-stop").click(function () {
        stopCode();
    });
    $("#code-reset").click(function () {
        editor.setValue(code);
    });
});
