const { Box } = MaterialUI;

const ProjectBoxTopBar = ({
    projectsData, 
    handleProjectsFilter, 
    selectProject,
    selectedProjectIDs,
    currentProject,
    deleteProject,
    handlePanelChange
}) => {
    return (
        <Box>
            <ProjectsMenuList
            projectsData={projectsData}
            handleProjectsFilter={handleProjectsFilter}
            selectProject={selectProject}
            selectedProjectIDs={selectedProjectIDs}
            currentProject={currentProject}
            />
            <ProjectOptionsMenu
            currentProject={currentProject}
            deleteProject={deleteProject}
            handlePanelChange={handlePanelChange}
            />
         </Box>
    )
}