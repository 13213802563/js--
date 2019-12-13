$(function() {
	//页面淡入效果
	$(".animsition").animsition({
		inClass: 'fade-in',
		outClass: 'fade-out',
		inDuration: 300,
		outDuration: 1000,
		// e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
		loading: false,
		loadingParentElement: 'body', //animsition wrapper element
		loadingClass: 'animsition-loading',
		unSupportCss: ['animation-duration',
			'-webkit-animation-duration',
			'-o-animation-duration'
		],
		//"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
		//The default setting is to disable the "animsition" in a browser that does not support "animation-duration".

		overlay: false,

		overlayClass: 'animsition-overlay-slide',
		overlayParentElement: 'body'
	});

	document.onreadystatechange = subSomething;

	function subSomething() {
		if(document.readyState == "complete") {
			$('#loader').hide();
		}
	}

	//顶部时间
	function getTime() {
		var myDate = new Date();
		var myYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
		var myMonth = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
		var myToday = myDate.getDate(); //获取当前日(1-31)
		var myDay = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
		var myHour = myDate.getHours(); //获取当前小时数(0-23)
		var myMinute = myDate.getMinutes(); //获取当前分钟数(0-59)
		var mySecond = myDate.getSeconds(); //获取当前秒数(0-59)
		var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
		var nowTime;
		nowTime = myYear + '-' + fillZero(myMonth) + '-' + fillZero(myToday) + '&nbsp;&nbsp;' + week[myDay] + '&nbsp;&nbsp;' + fillZero(myHour) + ':' + fillZero(myMinute) + ':' + fillZero(mySecond);
		$('.topTime').html(nowTime);
	};

	function fillZero(str) {
		var realNum;
		if(str < 10) {
			realNum = '0' + str;
		} else {
			realNum = str;
		}
		return realNum;
	}
	setInterval(getTime, 1000);

	//运单状态文字滚动
	$('#FontScroll').FontScroll({ time: 3000, num: 1 });

    // mypie
//	<!--家政行业--------图二-->
var chart = Highcharts.chart('mypie', {
		chart: {
			zoomType: 'xy',
			backgroundColor: 'black',
			plotBackgroundColor: 'black'
		},
		title: {
			text: ''
		},
		xAxis: [{
			categories: ['2015', '2016', '2017', '2018', '2019', '2020'],
			crosshair: true,
			labels: {
				style: {
					color: 'white'
				}
			}
		}],
		yAxis: [{ // Primary yAxis
			labels: {
				format: '{value} 亿',
				style: {
					color: 'white'
				}
			},
			title: null
		}, { // Secondary yAxis
			title: null,
			labels: {
				format: '{value} %',
				style: {
					color: 'white'
				}
			},
			opposite: true
		}],
		legend: {
			enabled: false
		},
		series: [{
			name: '交易额',
			type: 'column',
			yAxis: 0,
			data: [2776, 3488, 4400, 5540, 6975, 8782]
		}, {
			name: '增长率',
			type: 'spline',
			color: 'yellow',
			yAxis: 1,
			data: [7.0, 6.9, 9.5, 14.5, 22.5, 30]
		}]
	});


//	<!--家政从业--------图一-->
	var chart = Highcharts.chart('myChart2', {
		chart: {
			backgroundColor: 'black',
			plotBackgroundColor: 'black',
		},
		title: {
			text: ''
		},
		xAxis: {
			labels: {
				style: {
					color: 'white'
				}
			},
			categories: ['2015', '2016', '2017', '2018','2019','2020']
		},
		yAxis: {
			labels: {
				format: '{value} 亿',
				style: {
					color: 'white'
				}
			},
			title: null
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'white'
					}
				}
			},
			spline: {
				dataLabels: {
					enabled: true
				},
                enableMouseTracking: false
			}
		},
		labels: {
			items: [{
				html: '服务人员缺口(千万)',
				style: {
					left: '100px',
					top: '18px',
					color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
				}
			}]
		},
		series: [{
				type: 'spline',
				data: [16, 20, 24, 28, 36, 16],
				marker: {
					lineWidth: 2,
					lineColor: Highcharts.getOptions().colors[2],
					fillColor: 'white'
				}
			},
			// {
			// 	type: 'pie',
			// 	data: [{
			// 		name: '从业',
			// 		y: 54,
			// 		color: Highcharts.getOptions().colors[1] // Jane's color
			// 	}, {
			// 		name: '缺口',
			// 		y: 46,
			// 		color: Highcharts.getOptions().colors[0] // John's color
			// 	}],
			// 	center: [10, 5],
			// 	size: 30,
			// 	dataLabels: {
			// 		enabled: true,
			// 		distance: -60
			// 	}
			// }
		]
	});

//	<!--居民支出--------图三-->

	var chart = Highcharts.chart('spider', {
		chart: {
			polar: true,
			type: 'area',
			backgroundColor: 'black',
			plotBackgroundColor: 'black'
		},
		title: {
			text: '',
			x: -80
		},
		pane: {
			size: '80%'
		},
		xAxis: {
			categories: ['医疗保健', '教育文化娱乐', '交通通信', '生活用品及服务',
				'居住', '衣着', '食品烟酒', '其他用品及服务'
			],
			lineWidth: 0,
			labels: {
				style: {
					color: 'white'
				}
			}
		},
		yAxis: {
			gridLineInterpolation: 'polygon',
			lineWidth: 0,
			min: 0,
			labels: {
				style: {
					color: 'white'
				}
			}
		},
		tooltip: {
			shared: true,
			pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
		},
		legend: {
			itemStyle: {
				"color": "white"
			}
		},
		series: [{
			name: '18年消费分布',
			data: [1685, 2226, 2675, 1223, 4647, 1289, 5631, 477],
			pointPlacement: 'on',
			color:'yellow'
		}, {
			name: '未来消费分布',
			data: [2065, 2524, 3556, 4324, 5200, 2300, 6500, 600],
			pointPlacement: 'on',
			color:'#FFFCEC'
		}]
	});


//	<!--数据地图--------图四-->

	var ChartMap = echarts.init(document.getElementById('myMap'));

	var mydata = [
		{ name: '上海', value: 323838 },
		{ name: '黑龙江', value: 21020 },
		{ name: '浙江', value: 32428 },
		{ name: '山东', value: 33738 },
		{ name: '湖南', value: 28850 },
		{ name: '甘肃', value: 41 },
		{ name: '福建', value: 3621 },
		{ name: '宁夏', value: 943 },
		{ name: '吉林', value: 15869 },
		{ name: '四川', value: 38532 },
		{ name: '贵州', value: 5377 },
		{ name: '青海', value: 32 },
		{ name: '天津', value: 537630 },
		{ name: '陕西', value: 68266 },
		{ name: '云南', value: 963 },
		{ name: '河南', value: 6741 },
		{ name: '西藏', value: 3 },
		{ name: '广东', value: 453395 },
		{ name: '内蒙古', value: 3987 },
		{ name: '北京', value: 3991287 },
		{ name: '安徽', value: 16290 },
		{ name: '江西', value: 8242 },
		{ name: '湖北', value: 11658 },
		{ name: '重庆', value: 14232 },
		{ name: '山西', value: 24263 },
		{ name: '新疆', value: 2091 },
		{ name: '辽宁', value: 19970 },
		{ name: '河北', value: 42861 },
		{ name: '海南', value: 8206 },
		{ name: '江苏', value: 58013 },
		{ name: '广西', value: 4041 },
		{ name: '台湾', value: 1 }
	];

	option = {

		title: {
			text: '全国订单量',
			fontSize: 3,
		},
		legend: {
			data: ['全国各城市订单缴费金额'],
			top: '20%'
		},
		tooltip: {
			trigger: 'item'
		},

		toolbox: {
			show: false,
			feature: {
				dataView: { readOnly: false },
			}
		},

		visualMap: {
			show: false,
			x: 'center',
			y: 'bottom',
			splitList: [
				{ start: 100000, end: 500000 }, { start: 500000, end: 50000000 },
				{ start: 10000, end: 50000 }, { start: 50000, end: 100000 },
				{ start: 0, end: 5000 }, { start: 5000, end: 10000 }
			],
			color: ['#5475f4', '#81db7c', '#75e1cd', '#a0e9a1', '#9fb5ea', '#213278'],
			textStyle: { color: "#fff" }
		},

		series: [{
			name: '全国订单量',
			type: 'map',
			mapType: 'china',
			label: {
				normal: {
					show: true, //显示省份标签
					fontSize: 10,
					//				formatter:'{b}\n{c}',
					textStyle: { color: "#3d4aa9" } //省份标签字体颜色
				},
				emphasis: { //对应的鼠标悬浮效果
					show: false,
					textStyle: { color: "#3d4aa9" }
				}
			},
			itemStyle: {
				normal: {
					borderWidth: .5, //区域边框宽度
					borderColor: '#009fe8', //区域边框颜色
					areaColor: "#1d243e", //区域颜色
				},
				emphasis: {
					borderWidth: .5,
					borderColor: '#4b0082',
					areaColor: "#ffdead",
				}
			},
			data: mydata
		}],
	};

	ChartMap.setOption(option);



//	<!--服务内容韦恩图--------图五-->

	var chart = Highcharts.chart('mybubble', {
		chart: {
			type: 'packedbubble',
			backgroundColor: 'black',
			plotBackgroundColor: 'black'
		},
		title: {
			text: ''
		},
		tooltip: {
			useHTML: true,
			pointFormat: '<b>{point.name}:</b> {point.y}m CO<sub>2</sub>'
		},

		legend: {
			itemStyle: {
				"color": "white"
			}
		},

		plotOptions: {
			packedbubble: {
				minSize: '30%',
				maxSize: '100%',
				zMin: 0,
				zMax: 1000,
				layoutAlgorithm: {
					gravitationalConstant: 0.05,
					splitSeries: true,
					seriesInteraction: false,
					dragBetweenSeries: true,
					parentNodeLimit: true
				},
				dataLabels: {
					enabled: true,
					format: '{point.name}',
					filter: {
						property: 'y',
						operator: '>',
						value: 0
					},
					style: {
						color: 'black',
						textOutline: 'none',
						fontWeight: 'normal'
					}
				}
			}
		},
		series: [{
			name: '家政',
			data: [{
					name: '一般家务',
					value: 500.1
				},
				{
					name: "母婴服务",
					value: 78.3
				},
				{
					name: "产后修复",
					value: 415.4
				}, {
					name: "专业陪护",
					value: 353.2
				}, {
					name: "保洁服务",
					value: 337.6
				},
				{
					name: "搬家服务",
					value: 71.1
				},
				{
					name: "便捷护理",
					value: 69.8
				},
				{
					name: "家装维修",
					value: 67.7
				}
			]
		}, {
			name: '营养',
			data: [{
					name: "礼品兑换",
					value: 8.2
				},
				{
					name: "大集",
					value: 9.2
				},
				{
					name: "秒杀活动",
					value: 13.1
				},
				{
					name: "食品生鲜",
					value: 14.1
				}, {
					name: "年货礼包",
					value: 141.5
				}
			]
		}, {
			name: '健康',
			data: [{
					name: "精致丽人",
					value: 60.5
				},
				{
					name: "生活日用",
					value: 21.1
				},
				{
					name: "医疗服务",
					value: 31.7
				},
				{
					name: "按摩理疗",
					value: 47.8
				},
				{
					name: "旅居养老",
					value: 74.3
				},
				{
					name: "摄影写真",
					value: 4.3
				}
			]
		}]
	})




});
