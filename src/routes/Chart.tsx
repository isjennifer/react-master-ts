import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexCharts from "react-apexcharts";


interface ChartProps {
    coinId: string | undefined;
}

interface ICoinHistory {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}


function Chart({coinId}:ChartProps) {
    const { isLoading, data } = useQuery<ICoinHistory[]>(["ohlcv",coinId],()=>fetchCoinHistory(coinId))
    const candleX:any = data?.map((price)=>new Date(price.time_close * 1000).toUTCString());
    const candleY:any =  data?.map((price)=>[price.open, price.high, price.low, price.close]);
    function MakeCandleData(a:any, b:any) {
        return{
            x : a,
            y : b
        }
    }
    const candlestickData = [];
    for(let key in candleX) {
        candlestickData.push(MakeCandleData(candleX[key],candleY[key]));
    }

    return <div>{ isLoading ? "Loading Chart..." : 
        <>
        <ApexCharts
            type="line"
            series={[{
                name: "price",
                data: data?.map((price)=>parseFloat(price.close))??[],
            }]}
            options={{
                theme: {
                    mode:"dark"
                },
                chart:{
                    toolbar:{
                        show:false,
                    },
                    height:500,
                    width:500,
                    background:"transparent",
                },
                stroke:{
                    curve:"smooth",
                },
                grid:{
                    show:false,
                },
                yaxis:{
                    show:false,
                },
                xaxis:{
                    labels:{
                        show:false,
                    },
                    axisTicks:{show:false},
                    type:"datetime",
                    categories: data?.map((price)=>new Date(price.time_close * 1000).toUTCString())??[]
                },
                fill:{
                    type:"gradient",
                    gradient:{gradientToColors:["#0be881"], stops:[0,100]}
                },
                tooltip:{
                    y:{
                        formatter: (val) => `$ ${val}`
                    }
                },
                colors: ["#0fbcf9"]
            }} 
        />
        <ApexCharts
            type="candlestick"
            series={[{
                name: "price",
                data: candlestickData,
            }]}
            options={{
                theme: {
                    mode:"dark",
                },
                xaxis: {
                    labels:{
                        show:false,
                    },
                    axisTicks:{
                        show:false,
                    },
                },
                yaxis :{
                    labels:{
                        show:false,
                    },
                    tooltip:{
                        enabled: true,
                    }
                },
                grid:{
                    show: false,
                },
                chart:{
                    toolbar:{
                        show:false,
                    },

                    background:"transparent",
                },
        }}
        />
        </>
        }</div>;
}

export default Chart;