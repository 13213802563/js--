var codeData;

if(getQueryString("code")){
    codeData=getQueryString("code");
    _localStorage.setItem('codeData',codeData);
}else{
    codeData= _localStorage.getItem("codeData")
}

if(jzjy.getToken()){
    jzjy.ajax({
        params: {
            code:codeData,
            curPage: 1,
            pageCount: 10,
            token:jzjy.getToken()
        },
        async: false,
        url: "personnelApp/serveCourse"

    }, function(data) {
        console.log(data);
        var datas = data.data.courseGoods;
        var datasImg = '';
        if(datas.length == 0) {
            datasImg += '<img src="../../images/previewempty.png" class="training-img"/>'

            $(".datasImg").html(datasImg)
        } else {
            //console.log(datas);
            var html = ''
            for(var i = 0; i < datas.length; i++) {
                html ='<div class="traininglist">' +
                    '<div class="traininglist-left">' +
                    /*'<img src="../../images/accept-logo.png" />' +*/
                    '<img src="'+datas[i].picture+'" style="width:100%"/>'+

                    '</div>' +
                    '<div class="traininglist-right">' +
                    '<h2>' + datas[i].name + '</h2>' +
                    '<div class="right-content">' +
                    '<div>' + datas[i].progress + '</div>' +
                    '<div class="content-con">' +
                    '<img src="../../images/browser.png" />' +
                    '<span>' + datas[i].readCount + '</span>' +
                    '</div>' +
                    '</div>' +
                    '<h1>' + datas[i].priceStr + '</h1>' +
                    '</div>' +
                    '</div>';
                $("<li></li>").append(html).appendTo($("#thelist")).on("click",function(){
                    window.location.href="listdetail.html?id="+$(this).attr("data-id")+'&sign=2';
                }).attr("data-id",datas[i].id);
            }
        }
    });
}
else{
    jzjy.ajax({
        params: {
            code:codeData,
            curPage: 1,
            pageCount: 10
        },
        async: false,
        url: "personnelApp/serveCourse"

    }, function(data) {
        console.log(data);
        var datas = data.data.courseGoods;
        var datasImg = '';
        if(datas.length == 0) {
            datasImg += '<img src="../../images/previewempty.png" class="training-img"/>'
            $(".datasImg").html(datasImg)
        } else {
            //console.log(datas);
            var html = ''
            for(var i = 0; i < datas.length; i++) {
                html ='<div class="traininglist">' +
                    '<div class="traininglist-left">' +
                    /*'<img src="../../images/accept-logo.png" />' +*/
                    '<img src="'+datas[i].picture+'" style="width:100%"/>'+

                    '</div>' +
                    '<div class="traininglist-right">' +
                    '<h2>' + datas[i].name + '</h2>' +
                    '<div class="right-content">' +
                    '<div>' + datas[i].progress + '</div>' +
                    '<div class="content-con">' +
                    '<img src="../../images/browser.png" />' +
                    '<span>' + datas[i].readCount + '</span>' +
                    '</div>' +
                    '</div>' +
                    '<h1>' + datas[i].priceStr + '</h1>' +
                    '</div>' +
                    '</div>';
                $("<li></li>").append(html).appendTo($("#thelist")).on("click",function(){
                    window.location.href="listdetail.html?id="+$(this).attr("data-id")+'&sign=2';
                }).attr("data-id",datas[i].id);
            }
        }
    });
}
$("#lo_left").on("click",function () {
    goto("../../html/curriculum/index.html")
})

