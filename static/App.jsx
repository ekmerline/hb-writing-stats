const { AppBar, Toolbar, Box, Typography, Checkbox, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, IconButton, Button, Menu, MenuItem } = MaterialUI;
const { BrowserRouter, Link, Switch, Route, useHistory } = ReactRouterDOM;
const { useState } = React;

const App = () => {

    let history = useHistory();

    const [userID, setUserID ] = useState(null);
    const [projectsData, setProjectsData] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);
    const [entryTypes, setEntryTypes] = useState([]);
    const [entriesData, setEntriesData] = useState([]);
    const [filteredEntriesData, setFilteredEntriesData] = useState([]);
    const [currentProject, setCurrentProject] = useState('all');
    const [currentEntry, setCurrentEntry] = useState({});
    const [selectedProjectIDs, setSelectedProjectIDs] = useState(new Set());

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

      
    const loadData = () => {
        fetch('http://localhost:5000/api/projects', {
            method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                setProjectsData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        fetch('http://localhost:5000/api/entries', {
            method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                setEntriesData(data);
                setFilteredEntriesData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        fetch('http://localhost:5000/api/entry-types', {
            method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                setEntryTypes(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        fetch('http://localhost:5000/api/project-types', {
            method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                setProjectTypes(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const verifyUser = () => {
        setUserID(sessionStorage.getItem('user_id'));
        loadData();
    }

    const addNewProject = newProject => {
        setProjectsData([...projectsData, newProject]);
    }

    const updateProject = newProject => {
        const newProjectsData = projectsData.filter(project => {
            if(project['project_id'] === newProject['project_id']){
                project = newProject;
            }
        })
        setProjectsData(newProjectsData);
    }

    const addNewEntry = newEntry => {
        setEntriesData([...entriesData, newEntry]);
    }

    const updateEntriesData = newEntry => {
        const newEntriesData = entriesData.filter(entry => {
            if(entry['entry_id'] === newEntry['entry_id']){
                entry = newEntry;
            }
        })
        setEntriesData(newEntriesData);
    }

    const selectEntry = entryData => {
        setCurrentEntry(entryData);
    }


    const handleToggle = projectID => {
        const newSet = new Set(selectedProjectIDs);
        if(selectedProjectIDs.has(projectID)){
            newSet.delete(projectID);
            setSelectedProjectIDs(newSet);
            
        }else {
            newSet.add(projectID);
            setSelectedProjectIDs(newSet);
        }
        if(newSet.size === 0){
            setFilteredEntriesData(entriesData);
        }else {
            const newFilteredEntries = entriesData.filter(entryData => newSet.has(entryData['project_id']));
            setFilteredEntriesData(newFilteredEntries);
        }
    }

    const selectedProjectEdit = projectID => {
        setCurrentProject(projectID);
        history.push('/edit-project');
    }


    return (
        <BrowserRouter>
            <Box className="App">
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        <MaterialUI.Link component={Link} to="/">Home</MaterialUI.Link>
                        {userID ? (
                            <React.Fragment>
                                <MaterialUI.Link component={Link} to="/new-project">New Project</MaterialUI.Link>
                                <MaterialUI.Link component={Link} to="/new-entry">New Entry</MaterialUI.Link>
                                <div>
                                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                    Projects
                                    </Button>
                                <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                >
                                    {projectsData.map((projectData) => (
                                        <MenuItem key={projectData['project_id']} dense button onClick={() => handleToggle(projectData['project_id'])}>
                                            <ListItemIcon>
                                                <Checkbox
                                                edge="start"
                                                checked={selectedProjectIDs.has(projectData['project_id'])}
                                                tabIndex={-1}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={`project-checkbox-${projectData['project_id']}`} primary={projectData['project_name']} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="edit" onClick={() => selectedProjectEdit(projectData['project_id'])}>
                                                    <span>Edit</span>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </MenuItem>
                                        ))}
                                </Menu>
                                </div>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <MaterialUI.Link component={Link} to="/login">Login</MaterialUI.Link>
                            </React.Fragment>
                        )}
                    </Toolbar>
                </AppBar>
                <Box className="main">
                    <Switch>
                        <Route exact path="/">
                            <React.Fragment>
                                <Box>
                                    {userID ? (
                                        <StatsDisplay
                                        entriesData={filteredEntriesData}
                                        selectEntry={selectEntry}
                                        >
                                        </StatsDisplay>
                                    ) : (
                                    <React.Fragment>
                                    The main page!
                                    </React.Fragment>
                                    )}
                                </Box>
                            </React.Fragment>
                        </Route>
                        <Route path="/login">
                            <React.Fragment>
                                <Box>
                                    <Login verifyUser={verifyUser}>
                                    </Login>
                                </Box>
                            </React.Fragment>
                        </Route>
                        <Route path="/new-project">
                            <React.Fragment>
                                <Box>
                                    <CreateProject
                                    projectTypes={projectTypes}
                                    updateProjectsData={addNewProject}
                                    >
                                    </CreateProject>
                                </Box>
                            </React.Fragment>
                        </Route>
                        <Route path="/edit-project">
                            <React.Fragment>
                                <Box>
                                    <EditProject
                                    currentProject={currentProject}
                                    projectTypes={projectTypes}
                                    updateProjectsData={updateProject}
                                    projectsData={projectsData}
                                    >
                                    </EditProject>
                                </Box>
                            </React.Fragment>
                        </Route>
                        <Route path="/new-entry">
                            <React.Fragment>
                                <Box>
                                    <CreateEntry
                                    entryTypes={entryTypes}
                                    updateEntries={addNewEntry}
                                    projectsData={projectsData}
                                    >
                                    </CreateEntry>
                                </Box>
                            </React.Fragment>
                        </Route>
                        <Route path="/edit-entry">
                            <React.Fragment>
                                <Box>
                                    <EditEntry
                                    entryTypes={entryTypes}
                                    updateEntries={updateEntriesData}
                                    projectsData={projectsData}
                                    currentEntry={currentEntry}
                                    >
                                    </EditEntry>
                                </Box>
                            </React.Fragment>
                        </Route>
                    </Switch>
                </Box>
            </Box>
        </BrowserRouter>


    )
}

ReactDOM.render(<App />, document.querySelector('#root'));