import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { ProgressSpinner } from 'primereact/progressspinner';
import PropTypes from 'prop-types'

function ChartRenderer({
XAxisData,
seriesDataLine,
seriesDataArea,
seriesDataPie,
seriesDataBar,
legendLabels,
type
}) {
    //#region state
    const [optionLine, setoptionLine] = useState({});
    const [optionArea, setoptionArea] = useState({});
    const [optionPie, setoptionPie] = useState({});
    const [optionBar, setoptionBar] = useState({});
    const [Loading, setLoading] = useState(true);
    //#endregion state
    //#region useEffect
    useEffect(() => {
        setLoading(true);
       switch (type) {
            case 'line':
                setoptionLine({
                    xAxis: {
                        type: 'category',
                        data: XAxisData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: seriesDataLine,
                        type: 'line'
                    }]
                })
                setLoading(false);
               break;
            case 'area':
            setoptionArea({
                // title: {
                //     text: '堆叠区域图'
                // },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: legendLabels
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: XAxisData
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: seriesDataArea?.map((ele) => ({
                    name: ele.name,
                    type: 'line',
                    stack: ele.stack,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: ele.data
                }))
            })
            setLoading(false);
            break;
            case 'pie':
            setoptionPie({
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '40',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: seriesDataPie?.map((ele) => ({
                            value: ele.value, 
                            name: ele.name
                        }))
                    }
                ]
            })
            setLoading(false);
            break;
            case 'bar':
            setoptionBar({
                xAxis: {
                    type: 'category',
                    data: XAxisData
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: seriesDataBar,
                    type: 'bar'
                }]
            })
            setLoading(false);
            break;
       
           default:
            setLoading(false);
               break;
       }
    }, [
        XAxisData,
        seriesDataLine,
        seriesDataArea,
        seriesDataPie,
        seriesDataBar,
        legendLabels,
        type 
    ])
    //#endregion useEffect
    //#region return
    return (
        <>
        {
            Loading ? <ProgressSpinner /> :
            <>
            {type === 'line' && <ReactECharts option={optionLine} />}
            {type === 'area' && <ReactECharts option={optionArea} />}
            {type === 'pie' && <ReactECharts option={optionPie} />}
            {type === 'bar' && <ReactECharts option={optionBar} />}
            </>
        }
        </>
    );
    //#endregion return
}
export default ChartRenderer;

ChartRenderer.prototype = {
    XAxisData: PropTypes.array,
    seriesDataLine: PropTypes.array,
    seriesDataArea: PropTypes.array,
    seriesDataPie: PropTypes.array,
    seriesDataBar: PropTypes.array,
    legendLabels: PropTypes.array,
}
