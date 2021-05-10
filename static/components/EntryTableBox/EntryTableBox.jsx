const { Box, Grid, Paper } = MaterialUI;


const EntryTableBox = ({entriesData, deleteEntry, projectsData, entryTypes, updateEntries}) => {

    const classes = useStyles();

    return (
        <Grid item md={12} sm={12}>
            <Box  display="flex" justifyContent="center" >
                <Paper className={`${classes.entryTableBox} ${classes.root}`} elevation={3} >
                    {/* <Box className={classes.borderBox}>Entries Table</Box> */}
                    <StatsDisplay
                    entriesData={entriesData}
                    deleteEntry={deleteEntry}
                    projectsData={projectsData}
                    entryTypes={entryTypes}
                    updateEntries={updateEntries}
                    />
                </Paper>
            </Box>
        </Grid>

    )
}