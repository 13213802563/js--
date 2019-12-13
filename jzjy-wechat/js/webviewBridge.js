/**
 * 判断用户手机系统
 * @date 28th Jan 2019 ver.1
 * @return {string}
 */
var checkPlatform = function () {
    var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1;
    var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isAndroid) {
        return 'android'
    } else if (isIOS) {
        return 'ios'
    }
}


/**
 * 苹果端处理
 * @date 28th Jan 2019 ver.1
 * @param callback
 * @return {*}
 */
var setupWebViewJavascriptBridge = function(callback) {
    // ios处理
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

/**
 * 安卓端处理
 * @date 28th Jan 2019 ver.1
 * @param callback
 */
var connectWebViewJavascriptBridge = function(callback) {
    //web调提供方法给app调用
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function() {
                callback(WebViewJavascriptBridge)
            },
            false
        );
    }
}

/**
 * 根据用户系统判断使用哪个桥
 * @returns {*}
 */
function initBridge() {
    /**
     * 这里开始请勿修改
     */
    if(checkPlatform() === 'android'){
        return connectWebViewJavascriptBridge(function (bridge) {
            bridge.init(function(message, responseCallback) {
                var data = {
                    'test' : '1'
                }
                responseCallback(data)
            })

        })
    }
    if(checkPlatform() === 'ios'){
        return setupWebViewJavascriptBridge()
    }
}
initBridge()

/**
 * 桥方法列表
 * @type Object
 */
var bridgeObj = {
    back: function (obj) {
        WebViewJavascriptBridge.callHandler('back', obj, function (response) {
            console.log(response)

        })
    },
    test1:function (obj,callback) {
        WebViewJavascriptBridge.callHandler('test1', obj, function (response) {
        })
    },
    test2:function (obj,callback) {
        WebViewJavascriptBridge.callHandler('test2', obj, function (response) {
        })
    },
    test3:function (obj) {
        WebViewJavascriptBridge.callHandler('test3', obj, function (response) {
            console.log(response)

        })
    }
};


/*ReadMe（切勿删除）*/
// 客户端调用js方法，需要使用registerHandler进行注册，代码如下
// bridge.registerHandler('back', function(data, responseCallback) {
//     console.log("JS Echo called with:", data)
//     responseCallback(data)
// })
//
// h5调用客户端方法，需要调用callHandler方法注册，代码如下
// bridge.callHandler('back',{},function(responseCallback) {
//     responseCallback(data)
// })