import React, {useEffect} from "react";
//create a line chart
// import { Chart as ChartJS } from "react-chartjs-2";
// ArcElement, Tooltip, Legend
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../../services/api";
import { CoinHistory, PriceChartProps } from "../../utils/types";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
//register category scale
import { registerables, Chart as ChartJS } from 'chart.js';
ChartJS.register(...registerables);



const PriceChart: React.FC<PriceChartProps> = ({ symbol , interval}) => {
    const { data, isLoading, error } = useQuery<CoinHistory[]>(['coinHistory', symbol], () => fetchCoinHistory(symbol, interval), {
        enabled: !!symbol,
    });
    useEffect(() => {
        console.log('daddad')
        let chart: any
        //fetch new data
        fetchCoinHistory(symbol, interval).then(
            (data) => {
                console.log(data);
                chart = new ChartJS('myChart', {
                    type: 'line',
                    data: {
                        labels: data?.map(item => format(new Date(item.time), 'dd MMM yyyy HH:mm', {locale: ru})),
                        datasets: [
                            {
                                label: 'Цена (USD)',
                                data: data?.map(item => item.priceUsd),
                                fill: false,
                                backgroundColor: 'rgba(75,192,192,0.4)',
                                borderColor: 'rgba(75,192,192,1)',
                            },
                        ],
                    },
                });
            }

        );

        // chart.update();
        return () => {
            chart.destroy();
        }
    },[interval]);
    if (isLoading) return <Loader />;
    if (error) return <ErrorMessage message="Ошибка загрузки данных" />;
    // if(!data) return null;
    const chartData = {
        labels: data?.map(item => format(new Date(item.time), 'dd MMM yyyy HH:mm', {locale: ru})),
        datasets: [
            {
                label: 'Цена (USD)',
                data: data?.map(item => item.priceUsd),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    return (
        <div >
            {isLoading ?
                (<Loader />) : (
                    <canvas id="myChart" width="400" height="400"></canvas>
                )
            }
            {/*<Chart.Line data={chartData} />*/}
        </div>
    );
};

export default PriceChart;