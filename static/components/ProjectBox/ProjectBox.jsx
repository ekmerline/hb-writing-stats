const { Box, Button, Menu, MenuItem, Grid } = MaterialUI;
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
    deleteProject
}) => {


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
                />  
                )
            case panels.CREATEPROJECT:
                return (
                <CreateProject
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
                />
                )
            default:
                return (
                    <Box>
                        There was an error rendering this box.
                    </Box>
                )
        }
    }



    return (
        <Grid item md={6} sm={12}>
            <Box {...defaultBoxProps}>
                <ProjectBoxTopBar
                projectsData={projectsData}
                handleProjectsFilter={handleProjectsFilter}
                selectProject={selectProject}
                selectedProjectIDs={selectedProjectIDs}
                currentProject={currentProject}
                deleteProject={deleteProject}
                handlePanelChange={handlePanelChange}
                />
                {currentPanel()}
                <Box>
                    <Button onClick={()=>handlePanelChange(panels.CREATEPROJECT)}>New Project</Button>
                    <Button onClick={()=>handlePanelChange(panels.CREATEENTRY)}>New Entry</Button>
                </Box>
            </Box>
        </Grid>

    )
}