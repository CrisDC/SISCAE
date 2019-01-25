var $funcionGraficoUtil = {};

$(document).ready(function() {
	
	var amChartPropiedadesGraficoBarrasSegmentado = {};
	var amChartPropiedadesGraficoBarras = {};
	var amChartPropiedadesGraficoLineas = {};
	var amChartPropiedadesGraficoPie = {};
	
	$funcionGraficoUtil = {
			crearGraficoBarras : function(datos, valorJSONEjeX, valorJSONEjeY, tituloGrafico, tituloEjeY, ballonText){
				amChartPropiedadesGraficoBarras = {
						"type": 'serial',
					    "theme": "light",
					    "dataProvider": datos,
					    "categoryField": valorJSONEjeX,
					    "graphs": [{
					        "fillAlphas": 0.9,
					        "lineAlpha": 0.2,
					        "type": "column",
					        "valueField": valorJSONEjeY,
					        "balloonText": ballonText
					    }],
					    "titles": [{
								"text": tituloGrafico,
								"size": 14
						}],
					    "valueAxes": [{
					        "stackType": "regular",
					        "gridAlpha": 0.07,
					        "position": "left",
					        "title": tituloEjeY
					     }],
					    "chartCursor": {
					      "fullWidth": true,
					      "cursorAlpha": 0.1
					    },
					    "export": {
					        "enabled": true
					     },
					     "chartScrollbar": {
					    	    "offset": 15,
					    	    "scrollbarHeight": 5
					     }

				}
				
				return amChartPropiedadesGraficoBarras;
				
			},
			crearGraficoLineal : function(tipoGrafico, datos, valorJSONEjeX, valorJSONEjeY, tituloGrafico, tituloEjeY, ballonText){
				amChartPropiedadesGraficoLineas = {
						"type": "serial",
						  "theme": "light",
						  "autoMarginOffset": 20,
						  "mouseWheelZoomEnabled": true,
						  "dataDateFormat": "YYYY-MM-DD",
						  "valueAxes": [{
						    "axisAlpha": 0,
						    "position": "left",
						    "ignoreAxisWidth": true
						  }],
						  "graphs": [{
						    "id": "g1",
						    "bullet": "round",
						    "bulletBorderAlpha": 1,
						    "bulletColor": "#FFFFFF",
						    "bulletSize": 5,
						    "hideBulletsCount": 50,
						    "lineThickness": 2,
						    "title": "red line",
						    "useLineColorForBulletBorder": true,
						    "valueField": valorJSONEjeX,
						    "balloonText": ballonText
						  }],
						  "chartScrollbar": {
						    "graph": "g1",
						    "oppositeAxis": false,
						    "offset": 30,
						    "scrollbarHeight": 80,
						    "backgroundAlpha": 0,
						    "selectedBackgroundAlpha": 0.1,
						    "selectedBackgroundColor": "#888888",
						    "graphFillAlpha": 0,
						    "graphLineAlpha": 0.5,
						    "selectedGraphFillAlpha": 0,
						    "selectedGraphLineAlpha": 1,
						    "autoGridCount": true,
						    "color": "#AAAAAA"
						  },
						  "chartCursor": {
						    "pan": true,
						    "valueLineEnabled": true,
						    "valueLineBalloonEnabled": true,
						    "cursorAlpha": 1,
						    "cursorColor": "#258cbb",
						    "valueLineAlpha": 0.2,
						    "valueZoomable": true
						  },
						  "valueScrollbar": {
						    "oppositeAxis": false,
						    "offset": 50,
						    "scrollbarHeight": 10
						  },
						  "categoryField": valorJSONEjeY,
						  "categoryAxis": {
						    "parseDates": true,
						    "dashLength": 1,
						    "minorGridEnabled": true
						  },
						  "export": {
						    "enabled": true
						  },						  
						  "listeners": [{
						    "event": "rendered",
						    "method": function(e) {
						      e.chart.valueAxes[0].zoomToValues(30, 70);
						    }
						  }],
						  "dataProvider": datos
				}
				return amChartPropiedadesGraficoLineas;
			},
			crearGraficoBarrasSegmentado : function(datos,graph,valueYJSON,tituloEjeY,presentancion,tituloGrafico){
				amChartPropiedadesGraficoBarrasSegmentado = {
						  "type": "serial",
						  "theme": "light",
						  "legend": {
							    "horizontalGap": 10,
							    "useGraphSettings": true,
							    "markerSize": 10
						  },
						  "titles": [{
								"text": tituloGrafico,
								"size": 14
						  }],
						  "valueAxes": [{
						        "stackType": presentancion,
						        "gridAlpha": 0.07,
						        "position": "left",
						        "title": tituloEjeY
						   }],
						  "dataProvider": datos,
						  "graphs": graph,
						  "categoryField": valueYJSON,
						  "categoryAxis": {
						    "gridPosition": "start",
						    "axisAlpha": 0,
						    "gridAlpha": 0,
						    "position": "left"
						  },
						  "export": {
						    "enabled": true
						  },
						  "chartScrollbar": {
					    	    "offset": 15,
					    	    "scrollbarHeight": 5
					     }

				}
				return amChartPropiedadesGraficoBarrasSegmentado;
				
			},
			crearGraficoPie : function(datos, valorJSONEjeX, valorJSONEjeY, tituloGrafico, tituloEjeY){
				amChartPropiedadesGraficoPie = {
						"type": "pie",
						  "addClassNames": true,
						  "startDuration": 0,
						  "theme": "light",
						  "legend": {
						    "position": "bottom",
						    //"marginRight": 100,
						    "autoMargins": false,
						    "align" :  "center"
						  },
						  "innerRadius": "30%",
						  "dataProvider": datos,
						  "valueField": valorJSONEjeY,
						  "titleField": valorJSONEjeX,
						  "balloonText": "<b style='font-size:12px'>[[title]]</b> ([[percents]]%) <br> <span><b>Número Txn: </b>[[value]]</span> <br> <span><b>Monto: </b>[[montoAcumulado]]</span>",
						  "titles": [{
								"text": tituloGrafico,
								"size": 14
						  }]
				}
				return amChartPropiedadesGraficoPie;
			}			
	}
	
});