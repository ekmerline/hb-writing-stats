const { Box, Grid } = MaterialUI;


const EntryTableBox = ({entriesData, deleteEntry, projectsData, entryTypes, updateEntries}) => {

    return (
        <Grid item md={6} sm={12}>
            <Box {...defaultBoxProps}>
                <Box>Entries Table</Box>
                <StatsDisplay
                entriesData={entriesData}
                deleteEntry={deleteEntry}
                projectsData={projectsData}
                entryTypes={entryTypes}
                updateEntries={updateEntries}
                />
            </Box>
        </Grid>

    )
}