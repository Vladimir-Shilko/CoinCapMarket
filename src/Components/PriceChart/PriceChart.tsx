import React, {useEffect, useRef} from "react";
import { fetchCoinHistory } from "../../services/api";
import { PriceChartProps } from "../../utils/types";
// import Loader from "../Loader/Loader";
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
//register category scale
import { registerables, Chart as ChartJS } from 'chart.js';
ChartJS.register(...registerables);

const PriceChart: React.FC<PriceChartProps> = ({ symbol , interval}) => {
    //while fetching data show loader component and if error occurs show error message component
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const chartRef = useRef<ChartJS<"line", string[], string> | null>(null);
    useEffect(() => {
        console.log('change chart')
        let chart: ChartJS<"line", string[], string>
        if(!interval || interval==='')
        {
            interval='1'
        }
        console.log(symbol+' '+interval)
        fetchCoinHistory(symbol, interval).then(
            (data) => {
                console.log(data);
                if (chartRef.current) {
                                 chartRef.current.destroy();
                             }
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
                chartRef.current = chart;
                setIsLoading(false);
            }

        );
    },[interval]);
    
    return (
        <div >
            {isLoading ? (
                <p>Loading...</p>
            ) : null}
                    <canvas id="myChart" width="400" height="400"></canvas>
        </div>
    );
};

export default PriceChart;