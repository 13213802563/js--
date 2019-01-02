define(function () {
    var conf = {};
    conf.modelId = "materialsManagement";
    conf.modelMenu = [
        {
            modelId: "materials",
            iconStyleHtml: '<img src = "../source/public/img/YinJiYuAn.png" />',
            Name: "物资管理<i class=\"fa fa-angle-right\"></i>",
            Url: "../materialsManagement/materials.html"
        },
        {
            modelId: "audits",
            iconStyleHtml: '<img src = "../source/public/img/YinJiYuAn.png" />',
            Name: "调运管理<i class=\"fa fa-angle-right\"></i>",
            Url: "../materialsManagement/audits.html"
        },
        {
            modelId: "personnel",
            iconStyleHtml: '<img src = "../source/public/img/YinJiYuAn.png" />',
            Name: "人员管理<i class=\"fa fa-angle-right\"></i>",
            Url: "../materialsManagement/personnel.html"
        },
        {
            iconStyleHtml: '<img src = "../source/mapShow/img/YinJiYuAn.png" />',
            // modelId: "statisticsAll",
            Name: '物资统计<i class=\"fa fa-angle-right\"></i>',
            Url: "",
            subMenu: [
                {
                    modelId: "statisticsCity",
                    Name: "全市物资统计",
                    Url: "../materialsManagement/statisticsCity.html"
                },
                {
                    modelId: "statisticsTown",
                    Name: "镇街仓库统计",
                    Url: "../materialsManagement/statisticsTown.html"
                },
                {
                    modelId: "statisticsCityLevel",
                    Name: "市级仓库统计",
                    Url: "../materialsManagement/statisticsCityLevel.html"
                },
                {
                    modelId: "statisticsWater", 
                    Name: "水利工程公司统计",
                    Url: "../materialsManagement/statisticsWater.html"
                },
                {
                    modelId: "member",
                    Name: "防指成员统计",
                    Url: "../materialsManagement/member.html"
                },
            ]
        },
        {
            modelId: "standingBook",
            iconStyleHtml: '<img src = "../source/public/img/YinJiYuAn.png" />',
            Name: "调运台账<i class=\"fa fa-angle-right\"></i>",
            Url: "../materialsManagement/standingBook.html"
        },
    ];
    return conf;
});
