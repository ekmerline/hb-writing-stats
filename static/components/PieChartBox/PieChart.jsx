const {useEffect, useRef } = React;
const {Box, Grid, Paper } = MaterialUI;

const PieChart = ({entriesData}) => {

    const classes = useStyles();

    const chartRef = useRef(null);
    let myPieChart;

    useEffect(() => {

        const pieChartData = entriesData.reduce((acc, entry) => {
                if(acc[entry['entry_type_name']] !== undefined){
                    acc[entry['entry_type_name']] += entry['entry_minutes'];
                }else {
                    acc[entry['entry_type_name']] = entry['entry_minutes'];
                }
                return acc;
            }, {});

        
        const canvas = chartRef.current;
        const myChartRef = canvas.getContext("2d");

        myPieChart = new Chart(myChartRef, {
            type: "pie",
            data: {
                //Bring in data
                labels: Object.keys(pieChartData),
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
                        data: Object.values(pieChartData),
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
        return () => {
            if (typeof myPieChart !== "undefined"){
                myPieChart.destroy();
            }
        }
      }, [entriesData]);

        return (
            <Grid item md={4} sm={12}>
                <Paper display="flex" elevation={3} className={`${classes.pieBox} ${classes.root}`}>
                        <canvas
                            id="myChart"
                            ref={chartRef}
                        />

                </Paper>
            </Grid>

        )

}