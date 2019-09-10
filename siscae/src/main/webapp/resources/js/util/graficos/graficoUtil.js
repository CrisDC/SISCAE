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
			crearGraficoLineal : function(datos, valorJSONEjeX, valorJSONEjeY, ballonText){
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
						    "valueField": valorJSONEjeY,
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
						  "categoryField": valorJSONEjeX,
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
			crearGraficoPie : function(datos, valorJSONEjeX, valorJSONEjeY, tituloGrafico, tituloEjeY, balloonText ){
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
						  "balloonText": balloonText,
						  "titles": [{
								"text": tituloGrafico,
								"size": 14
						  }],
						  "export": {
							    "enabled": true
							  },
				}
				return amChartPropiedadesGraficoPie;
			},
			obtenerLeyendaGraficoBarrasSegementado : function(data,resultGraph, valueJSONX, tooltip){
				data.sort();								
				for(i=0;i<data.length;i++){
					var g = new Object();
					g['balloonText'] = tooltip;
					g['fillAlphas'] = 0.8;
					g['labelText'] = "[[value]]";
					g['labelPosition'] = "middle";
					g['lineAlpha'] = 0.3;
					g['title'] = valueJSONX;
					g['type'] = "column";
					g['valueField'] = valueJSONX;
					resultGraph.push(g);
				}
				return resultGraph;
			},
			obtenerJSONGraficoBarrasSegementado : function(response,atributoEjeX){
				var aux;
				for (i=0;i<response.length;i++){
					aux= new Object();
					aux[atributoEjeX] = response[i].ejeX;
					for (j=0;j<response[i].detalle.length;j++){
						aux[response[i].detalle[j].segmento] = response[i].detalle[j].numeroPrestamos;
					}
					data.push(aux);
				}
				return data;
			}
	}
	
});