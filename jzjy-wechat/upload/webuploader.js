
$.fn.toUpload = function(options){
    return this.each(function(){
        var $this = $(this);
        $this.off("change");
        $this.change(function(){
        	 lrz($(this)[0].files[0], {
        	        width: 800
        	    }).then(function (rst) {
        	        var img = new Image();
        	        	if(options.localOnLoad){
	        	        	img.onload = function(){
	        	        		 options.localOnLoad.call($this,img);
	        	        	};
	        	        }
        	        
	        	        img.src = rst.base64;
	        	        // 原生ajax上传代码，所以看起来特别多 ╮(╯_╰)╭，但绝对能用
	        	        // 其他框架，例如ajax处理formData略有不同，请自行google，baidu。
	        	        var xhr = new XMLHttpRequest();
	        	        xhr.open('POST', options.url);
	        	        xhr.onreadystatechange = function() {
	        	            if (xhr.readyState == 4) {
	        	                //当XHR的状态为4时判断请求成功与否，然后处理响应的数据，虽然当XHR的状态为2或者3时可以获取到响应状态，但是此时的数据还未下载完全，不能处理响应数据
	        	                if (xhr.status == 200) {
	        	                    //请求成功，处理响应数据
	        	                	 if(options.loaded){
			        	        		 options.loaded.call($this,xhr.responseText,rst);
			        	        	 }
	        	                } else {
	        	                    //请求失败
	        	                	 if(options.loadedError){
			        	        		 options.loadedError.call($this,xhr.responseText,rst);
			        	        	 }
	        	                }
	        	            }
	        	        };
	        	     // 添加参数和触发上传
	        	     if((typeof options.agrs) == 'function'){
	        	    	 var agrs = options.agrs.call($this);
	        	    	 for(var key  in agrs){
	        	    		 rst.formData.append(key,agrs[key]);
	        	    	 }
	        	     }else if((typeof options.agrs) == 'object'){
	        	    	 var agrs =  options.agrs;
	        	    	 for(var key  in agrs){
	        	    		 rst.formData.append(key,agrs[key]);
	        	    	 }
	        	     }
        	         xhr.send(rst.formData);
        		 })
        });
    });    
};  

function toFixed2 (num) {
    return parseFloat(+num.toFixed(2));
};






