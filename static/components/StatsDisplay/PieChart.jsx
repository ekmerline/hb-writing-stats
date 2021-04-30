const {useEffect, useRef } = React;

const PieChart = ({data, labels}) => {

    const chartRef = useRef(null);
    let myPieChart;

    useEffect(() => {
        const canvas = chartRef.current;
        const myChartRef = canvas.getContext("2d");

        myPieChart = new Chart(myChartRef, {
            type: "pie",
            data: {
                //Bring in data
                labels: labels,
                datasets: [
                    {
                        label: "Entry Type Minutes",
                        backgroundColor: [
                            '#90caf9',
                            '#001064',
                            '#5f5fc4'
                        ],
                        hoverBackgroundColor: [
                        '#bbdefb',
                        '#303f9f',
                        '#666ad1',
        
                        ],
                        data: data,
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });
        return () => {
            if (typeof myPieChart !== "undefined"){
                myPieChart.destroy();
            }
        }
      }, [data, labels]);

        return (
            <div className="pieChart-container">
                <canvas
                    id="myChart"
                    ref={chartRef}
                />
            </div>
        )

}