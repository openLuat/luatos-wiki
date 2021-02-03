var luaTask_L;
var luaTask_timerPool = {};
var luaTask_print;//给内部使用的函数输出函数
var luaTask_startTask = false;

//绑定一个函数到某名字
function luaTask_bindFn(fn,name) {
    fengari.lua.lua_pushjsfunction(luaTask_L, fn);
    fengari.lua.lua_setglobal(luaTask_L, fengari.to_luastring(name));
}

//启动定时器
//需要给lua返回一个timer id
function luaTask_luaStartTimer(L) {
    var id = fengari.lua.lua_tointeger(L,1);
    var ms = fengari.lua.lua_tointeger(L,2);
    var timer = setTimeout(() => {
        fengari.lua.lua_getglobal(luaTask_L, fengari.to_luastring("sysTriggerCB"));
        fengari.lua.lua_pushinteger(luaTask_L, id);
        fengari.lua.lua_pushstring(luaTask_L, fengari.to_luastring("timer"));
        fengari.lua.lua_pushstring(luaTask_L, fengari.to_luastring(""));
        if(fengari.lua.lua_pcall(luaTask_L,3,0,0))
        {
            luaTask_print("lua timer 回调报错：");
            luaTask_print(fengari.lua.lua_tojsstring(luaTask_L, -1));
        }
    }, ms);
    luaTask_timerPool[id] = {
        type: "timer",
        timer: timer,
    };
    fengari.lua.lua_pushinteger(L, 1);
    return 1;
}

//停止lua定时器
function luaTask_luaStopTimer(L) {
    var id = fengari.lua.lua_tointeger(L,1);
    clearTimeout(luaTask_timerPool[id].timer);
    delete luaTask_timerPool[id];
    return 0;
}

function luaTask_trigger(id,data){
    fengari.lua.lua_getglobal(luaTask_L, fengari.to_luastring("sysTriggerCB"));
    fengari.lua.lua_pushinteger(luaTask_L, -1);
    fengari.lua.lua_pushstring(luaTask_L, fengari.to_luastring(id));
    switch (typeof(data)) {
        case "number":
            if(data % 1 == 0)
                fengari.lua.lua_pushinteger(luaTask_L, data);
            else
                fengari.lua.lua_pushnumber(luaTask_L, data);
            break;
        case "string":
            fengari.lua.lua_pushstring(luaTask_L, fengari.to_luastring(data));
            break;
        case "boolean":
            fengari.lua.lua_pushboolean(luaTask_L, data);
            break;
        default:
            console.log("luaTask_trigger type can't use");
            console.log(typeof(data));
            console.log(data);
    }
    if(fengari.lua.lua_pcall(luaTask_L,3,0,0))
    {
        luaTask_print("lua trigger 回调报错：");
        luaTask_print(fengari.lua.lua_tojsstring(luaTask_L, -1));
    }
}

function luaTask_doString(s) {
    var r = fengari.lauxlib.luaL_dostring(luaTask_L,fengari.to_luastring(s));
    if(r){
        var err = fengari.lua.lua_tojsstring(luaTask_L, -1);
        return {success:false,error:err};
    }
    else{
        return {success:true,error:""};
    }
}


function luaTask_create() {
    luaTask_L = fengari.lauxlib.luaL_newstate();
    fengari.lualib.luaL_openlibs(luaTask_L);
    fengari.lauxlib.luaL_requiref(luaTask_L, fengari.to_luastring("js"), fengari.interop.luaopen_js, 1);
    luaTask_bindFn(luaTask_luaStartTimer,"sysLuaStartTimer");
    luaTask_bindFn(luaTask_luaStopTimer,"sysLuaStopTimer");
}

//回收lua对象，关闭所有timer，不用的时候要调用这个释放资源
function luaTask_clean() {
    if(typeof(luaTask_L) == "undefined")
        return;
    for(var i in luaTask_timerPool)
    {
        clearTimeout(luaTask_timerPool[i].timer);
        delete luaTask_timerPool[i];
    }
    fengari.lua.lua_close(luaTask_L);
}

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function luaPrint(s) {
    $("#output").append("["+new Date().Format("HH:mm:ss")+"] ");
    if(typeof(s) != "string")
        s = "";
    var textarea = $("#output").append(s.replace("<","&lt;") + "\r\n");
    textarea.scrollTop(textarea[0].scrollHeight - textarea.height());
}
luaTask_print = luaPrint;
luaPrint("加载完毕，等待运行");

function runCode(code) {
    newLuaState();
    $("#code-run").prop("disabled", true);
    $("#code-stop").prop("disabled", false);
    try {
        var r = luaTask_doString(code);
        if(!r.success) {
            luaPrint("虚拟机报错：");
            luaPrint(r.error);
        }
    }
    catch (err) {
        luaPrint("js环境报错：");
        luaPrint(err);
    }
}

function stopCode() {
    $("#code-run").prop("disabled", false);
    $("#code-stop").prop("disabled", true);
    luaTask_clean();
    luaPrint("虚拟机已停止运行");
}


var svg_scale = 1;
$("#svg-big").click(function () {
    svg_scale += 0.1;
    $("#main-svg").css("transform","scale("+svg_scale+")");
});

$("#svg-small").click(function () {
    svg_scale -= 0.1;
    $("#main-svg").css("transform","scale("+svg_scale+")");
});
