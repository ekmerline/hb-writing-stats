const { Box, Button, Menu, MenuItem, Grid, Paper } = MaterialUI;
const { useState } = React;


const ProjectBox = ({
    projectsData, 
    currentProject, 
    updateProject, 
    projectTypes,
    addNewProject,
    entryTypes,
    addNewEntry,
    handleProjectsFilter,
    selectProject,
    selectedProjectIDs,
    deleteProject,
    userID,
    handleProjectsFillerAll
}) => {

    const classes = useStyles();

    const [ mainPanelDisplay, setMainPanelDisplay ] = useState(panels.PROJECTDATA);

    const handlePanelChange = newPanel => {
        setMainPanelDisplay(newPanel);
    }

    const currentPanel = () => {
        switch(mainPanelDisplay){
            case panels.PROJECTDATA:
                return (
                <ProjectDataDisplay
                currentProject={currentProject}
                handlePanelChange={handlePanelChange}
                />  
                )
            case panels.CREATEPROJECT:
                return (
                <CreateProject
                    userID={userID}
                    projectTypes={projectTypes}
                    updateProjectsData={addNewProject}
                    handlePanelChange={handlePanelChange}
                />
                )
            case panels.EDITPROJECT:
                return (
                <EditProject
                    currentProject={currentProject}
                    projectTypes={projectTypes}
                    updateProjectsData={updateProject}
                    handlePanelChange={handlePanelChange}
                    />
                )
            case panels.CREATEENTRY:
                return (
                <CreateEntry
                entryTypes={entryTypes}
                updateEntries={addNewEntry}
                projectsData={projectsData}
                handlePanelChange={handlePanelChange}
                currentProject={currentProject}
                />
                )
            default:
                return (
                    <React.Fragment>
                        There was an error rendering this box.
                    </React.Fragment>
                )
        }
    }



    return (
        <Grid item md={3} sm={12}>
            <Paper className={`${classes.projectBox} ${classes.root}`} elevation={3} >
                <ProjectBoxTopBar
                handleProjectsFillerAll={handleProjectsFillerAll}
                projectsData={projectsData}
                handleProjectsFilter={handleProjectsFilter}
                selectProject={selectProject}
                selectedProjectIDs={selectedProjectIDs}
                currentProject={currentProject}
                deleteProject={deleteProject}
                handlePanelChange={handlePanelChange}
                />
                <Box className={classes.projectBoxMiddle}>
                {currentPanel()}
                </Box>
            </Paper>
        </Grid>

    )
}