const {useEffect, useRef } = React;
const {Box, Grid, Paper } = MaterialUI;

const LineGraph = ({entriesData}) => {

    const chartRef = useRef(null);
    let myLineGraph;
    const classes = useStyles();

    useEffect(() => {

        const reformatData =  dataType => {
            const entriesFiltered = entriesData.filter(entry => entry['entry_type_name'] === dataType);

            const entriesFilteredDate = entriesFiltered.reduce((acc, entry) => {
                const entryDate = new Date(entry['entry_datetime']).toLocaleString().split(',')[0];
                if(acc[entryDate] !== undefined){
                    acc[entryDate] += entry['entry_minutes'];
                }else {
                    acc[entryDate] = entry['entry_minutes'];
                }
                return acc;
            }, {});

            const entriesFilteredDataset = Object.entries(entriesFilteredDate).map(([key, value]) => {
                return { x: key, y: value }
            });

            return entriesFilteredDataset.reverse();
        }

        const entriesWriting = reformatData('writing');
        const entriesEditing = reformatData('editing');
        const entriesPlanning = reformatData('planning');

        // const entriesWriting = entriesData.filter(entry => entry['entry_type_name'] === 'writing');
        // const entriesEditing = entriesData.filter(entry => entry['entry_type_name'] === 'editing');
        // const entriesPlanning = entriesData.filter(entry => entry['entry_type_name'] === 'planning');

        // const entriesWritingDate = entriesWriting.reduce((acc, entry) => {
        //     const entryDate = new Date(entry['entry_datetime']).toLocaleString().split(',')[0];
        //     if(acc[entryDate] !== undefined){
        //         acc[entryDate] += entry['entry_minutes'];
        //     }else {
        //         acc[entryDate] = entry['entry_minutes'];
        //     }
        //     return acc;
        // }, {})

        // const entriesWritingDataset = Object.entries(entriesWritingDate).map(([key, value]) => {
        //     return { x: key, y: value }
        // })

        const canvas = chartRef.current;
        const myChartRef = canvas.getContext("2d");

        myLineGraph = new Chart(myChartRef,{
        type:    'line',
        data:    {
            datasets: [
                {
                    label: "Writing",
                    data: entriesWriting,
                    fill: false,
                    borderColor: 'blue'
                },
                {
                    label: "Editing",
                    data: entriesEditing,
                    fill: false,
                    borderColor: 'red'
                },
                {
                    label: "Planning",
                    data: entriesPlanning,
                    fill: false,
                    borderColor: 'green'
                }
                // ,
                // {
                //     label: "Editing",
                //     data: [{
                //         x: "04/01/2014", y: 175
                //     }, {
                //         x: "10/01/2014", y: 175
                //     }, {
                //         x: "04/01/2015", y: 178
                //     }, {
                //         x: "10/01/2015", y: 178
                //     }],
                //     fill: false,
                //     borderColor: 'red'
                // },
                // {
                //     label: "Planning",
                //     data: [{
                //         x: "04/01/2014", y: 175
                //     }, {
                //         x: "10/01/2014", y: 175
                //     }, {
                //         x: "04/01/2015", y: 178
                //     }, {
                //         x: "10/01/2015", y: 178
                //     }],
                //     fill: false,
                //     borderColor: 'green'
                // }
            ]
        },
        options: {
            responsive: true,
            title:      {
                display: true,
                text:    "Work by Day"
            },
            scales:     {
                xAxes: [{
                    type:       "time",
                    time: {
                        format: 'MM/DD/YYYY',
                        tooltipFormat: 'll'
                    },
                    scaleLabel: {
                        display:     true,
                        labelString: 'Date'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display:     true,
                        labelString: 'Minutes'
                    }
                }]
            }
        }
    });
        return () => {
            if (typeof myLineGraph !== "undefined"){
                myLineGraph.destroy();
            }
        }
      }, [entriesData]);

        return (
            <Grid item md={5} sm={12}>
                <Paper className={`${classes.lineGraphBox} ${classes.root}`} elevation={3} >
                    <canvas
                        id="myGraph"
                        ref={chartRef}
                    />
                </Paper>
            </Grid>

        )

}