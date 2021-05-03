const ProjectsDropdown = ({projectsData, project_id, onChange}) => {
    return (
        <FormControl style={{minWidth: 200}}>
                    <InputLabel id="project-label">Project</InputLabel>
                    <Select
                    labelId="project-label"
                    value={project_id}
                    name="project_id"
                    onChange={e => onChange(e)}
                    >
                    {projectsData.map((projectData, index) => 
                        <MenuItem 
                        key={index} 
                        value={projectData['project_id']}>
                            {projectData['project_name']}
                        </MenuItem>
                    )}
                    </Select>
                </FormControl>
    )
}