$(function() {
			$('#container').bind('', function(e) {
				var chart,
					point,
					i,
					event;
				for(i = 0; i < Highcharts.charts.length; i = i + 1) {
					chart = Highcharts.charts[i];
					event = chart.pointer.normalize(e.originalEvent); // Find coordinates within the chart
					point = chart.series[0].searchPoint(event, true); // Get the hovered point
					if(point) {
						point.highlight(e);
					}
				}
			});

			$.getJSON('data/activity.json', function(activity) {
				$.each(activity.datasets, function(i, dataset) {
					// 添加 X 数据
					dataset.data = Highcharts.map(dataset.data, function(val, j) {
						return [activity.xData[j], val];
					});
					$('<div class="chart" style="width:800px;height:130px">')
						.appendTo('#container')
						.highcharts({
							chart: {
								marginLeft: 40, // Keep all charts left aligned
								spacingTop: 20,
								spacingBottom: 20,
								backgroundColor: 'black',
								plotBackgroundColor: 'black',
								zoomType: 'xy'
							},
							title: {
								text: dataset.name,
								style: {
									color: 'white',
									fontSize: '10px'
								},
								align: 'left',
								margin: 0,
								x: 30
							},

							credits: {
								enabled: false
							},
							legend: {
								enabled: false
							},
							xAxis: {
								crosshair: true,
								labels: {
									format: '{value}月'
								}
							},
							yAxis: {
								title: {
									text: null
								}
							},
							plotOptions: {
								line: {
									dataLabels: {
										enabled: true,

									}
								},
								column: {
									dataLabels: {
										enabled: true,

									}
								},
								area: {
									dataLabels: {
										enabled: true,
									}
								}
							},

							series: [{
								data: dataset.data,
								name: dataset.name,
								type: dataset.type,
								color: Highcharts.getOptions().colors[i],
							}]
						});
				});
			})
		});