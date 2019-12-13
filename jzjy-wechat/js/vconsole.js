/**
 * 平台检测，当前程序仅在移动平台下有效。
 */
if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
	console.info('Version 1.0.0 Powered by Chasen');
    /**
     * 深拷贝方法
     * @param obj
     * @return {*}
     */
    function global_deepCopy(obj) {
        var result = Array.isArray(obj) ? [] : {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object') {
                    result[key] = global_deepCopy(obj[key]);
                } else {
                    result[key] = obj[key];
                }
            }
        }
        return result;
    }


    /**
     * 创建DOM选择器的动态值
     * @type {number}
     */
    var activityId = new Date().getTime();
    function getActivity(str) {
        return str + activityId;
    }

    /**
     * 创建CSS
     * @type {HTMLElement}
     */
    var css = document.createElement('style');
    css.innerText = getActivity('#btn') + '{width: 8vw;\n' +
        '            height: 8vw;\n' +
        '            background: #2c3e50;\n' +
        '            opacity: .6;\n' +
        '            color: #fff;\n' +
        '            line-height: 8vw;\n' +
        '            text-align: center;\n' +
        '            font-size: 3vw;\n' +
        '            position: fixed;\n' +
        '            z-index: 999999999999;\n' +
        '            left: 10vw;\n' +
        '            top: 10vw;\n' +
        '            border-radius: 100px;}' +
        getActivity('#wrap') + '{width: 100vw;\n' +
        '            height: 30vh;\n' +
        '            position: fixed;\n' +
        '            bottom: 0;\n' +
        '            left: 0;\n' +
        '            right: 0;\n' +
        '            z-index: 999999999999;\n' +
        '            font-size: 3vw;}' +
        getActivity('.content') + '>p' + '{word-wrap:break-word}' +
        getActivity('.warn') + '{color: #ccbc1c;}' +
        getActivity('.err') + '{color: #f00;}' +
        getActivity('.info') + '{color: dodgerblue;}' +
        getActivity('.log') + '{color: black;}' +
        getActivity('.ipt') + '{\n' +
        '            height: 20%;\n' +
        '            position: relative;\n' +
        '        }' +
        getActivity('.ipt') + '>input' + '{\n' +
        '            width: 70%;\n' +
        '            height: 100%;\n' +
        '            border: none;\n' +
        '            outline: none;\n' +
        '            font-size: 4vw;\n' +
        '\n' +
        '        }' +
        getActivity('.ipt') + '>button' + '{\n' +
        '            width: 30%;\n' +
        '            background: #42b983;\n' +
        '            color: #fff;\n' +
        '            font-size: 4vw;\n' +
        '            height: 100%;\n' +
        '            position: absolute;\n' +
        '            right: 0;\n' +
        '            top: 0;\n' +
        '            border: none;\n' +
        '            outline: none;\n' +
        '        }'+
        getActivity('.content') + '{\n' +
        '            height: 80%;\n' +
        '            background: #f9f9f9;\n' +
        '            overflow-y: scroll;\n' +
        '        }';
    document.head.appendChild(css);

		
		
    /**
     * 创建DOM节点
     * @type {HTMLElement}
     */
    var btn = document.createElement('div');
    btn.id = getActivity('btn');
    btn.innerText = 'open';
    document.body.appendChild(btn);

    var wrap = document.createElement('div');
    wrap.id = getActivity('wrap');
    wrap.style.display = 'none';
    document.body.appendChild(wrap);

    var content = document.createElement('div');
    content.className = getActivity('content');
    document.getElementById(getActivity('wrap')).appendChild(content);

    var ipt = document.createElement('div');
    ipt.className = getActivity('ipt');
    document.getElementById(getActivity('wrap')).appendChild(ipt);

    var cipt = document.createElement('input');
    cipt.type = 'text';
    cipt.id = getActivity('console-ipt');
    document.querySelector('.' + getActivity('ipt')).appendChild(cipt);


    var submit = document.createElement('button');
    submit.id = getActivity('console-btn');
    submit.innerText = '输入';
    document.querySelector('.' + getActivity('ipt')).appendChild(submit);

    /**
     * 深拷贝window.console方法
     */
    var vConsole = global_deepCopy(window.console);

    /**
     * 定义新console的输出功能，并在不同console.functions下进行参数区别调用。
     * @param o
     * @param consoleType
     */
    function vC_fn(o,consoleType){
    	        var p = document.createElement('p')
        p.className = getActivity('log');

        if(typeof o === 'object'){
            //if json|Dom|array
            if(Object.prototype.toString.call(o).toLowerCase() == "[object object]" && !o.length){
                p.innerText = consoleType + JSON.stringify(o);
            }
            //通过document.getElementById获取的元素
            if(Object.prototype.toString.call(o).toLowerCase().slice(1,12).replace(' ','') == 'objecthtml' && Object.prototype.toString.call(o).toLowerCase().indexOf('element') !== -1){
                p.innerText = consoleType + '\n目标为DOM节点' + '\nID:' + o.id + '\n' +
                    'CLASS:' + o.className + '\n' +
                    'TAG:' + o.tagName;
            }
            //目标对象是数组
            if(Object.prototype.toString.call(o).toLowerCase() == "[object array]"){
                p.innerText = consoleType + o
            }
            //目标对象是DOM集合
            if(Object.prototype.toString.call(o).toLowerCase() == "[object nodelist]"){
                let text = consoleType + '目标为DOM集合';
                for(let i = 0 ; i < o.length ; i++){
                    text += '\nCOUNT:' + i + '\nID:' + o[i].id + '\nCLASS:' + o[i].className + '\nTAG:' + o[i].tagName + '\n'
                }
                p.innerText = text;
            }
            //目标对象是DOM集合 JQ下
            if(Object.prototype.toString.call(o).toLowerCase() == "[object object]" && o.length){
                let text = consoleType + '目标为DOM集合';
                for(let i = 0 ; i < o.length ; i++){
                    text += '\nCOUNT:' + i + '\nID:' + o[i].id + '\nCLASS:' + o[i].className + '\nTAG:' + o[i].tagName + '\n'
                }
                p.innerText = text;
            }
        }else{
            p.innerText = consoleType + o;
        }
        document.querySelector(getActivity('.content')).appendChild(p)
    }

    /**
     * 重写console
     * @param o
     */
    console.log = function (o) {
        vC_fn(o,'[日志]')
    };

    console.error = function (o) {
        vC_fn(o,'[错误]')
    };

    console.warn = function (o) {
        vC_fn(o,'[警告]')
    };

    console.info = function (o) {
        vC_fn(o,'[信息]')
    };

    /**
     * 点击输入按钮后的事件
     */
    document.getElementById(getActivity('console-btn')).onclick = function () {
        var val = document.getElementById(getActivity('console-ipt')).value;
        
        var varReg = /^var|let|const/
        if(varReg.test(val) == true){
        	console.log('赋值未成功，请使用例：a = 3直接赋值');
        	return false;
        }
        
        var evl = eval(val)
        if(evl == undefined){
        	console.log('语句' + val + '没有返回值')
        }else{
        	console.log(evl)
        }
        
    };

    /**
     * 重写Error
     * @type {function(*=)}
     */
    var vError = Error;
    var Error = function (o) {
        this.name = 'error';
        console.log(o);
        return vError(o)

    };


    /**
     * 添加window.error的全局事件监听。
     * @param errorMessage
     * @param scriptURI
     * @param lineNumber
     * @param columnNumber
     * @param errorObj
     */
    window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
        function getscriptURI(){
            if(scriptURI){
                return scriptURI;
            }else{
                return '动态输入'
            }
        }
        console.error("错误信息：" + errorMessage );
        console.error("出错文件：" + getscriptURI());
        console.error("出错行号：" + lineNumber);
        console.error("出错列号：" + columnNumber);
        console.error("错误详情：" + errorObj);
    };

    /**
     * 打开按钮的点击事件
     */
    document.getElementById(getActivity('btn')).onclick = function () {
        if(document.getElementById(getActivity('btn')).innerText === 'open'){
            document.getElementById(getActivity('btn')).innerText = 'hide';
            document.getElementById(getActivity('wrap')).style.display = 'unset'
        }else {
            document.getElementById(getActivity('btn')).innerText = 'open';
            document.getElementById(getActivity('wrap')).style.display = 'none'
        }

    }
    
    if(window.$ == jQuery){
        console.log('jQuery已经引入，可以直接使用JQ语法输出')
    }

}