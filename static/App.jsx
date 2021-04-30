const { AppBar, Toolbar, Box, Typography, Checkbox, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, IconButton, Button, Menu, MenuItem } = MaterialUI;
const { BrowserRouter, Link, Switch, Route } = ReactRouterDOM;
const { useState } = React;

const App = () => {

    const [userID, setUserID ] = useState(null);
    const [projectsData, setProjectsData] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);
    const [entryTypes, setEntryTypes] = useState([]);
    const [entriesData, setEntriesData] = useState([]);
    const [filteredEntriesData, setFilteredEntriesData] = useState([]);
    const [currentProject, setCurrentProject] = useState('all');
    const [currentEntry, setCurrentEntry] = useState({});
    const [selectedProjectIDs, setSelectedProjectIDs] = useState(new Set());
    const [pieData, setPieData] = useState({});

    const filterChartData = chartEntriesData => {
        return chartEntriesData.reduce((acc, entry) => {
            if(acc[entry['entry_type_name']] !== undefined){
                acc[entry['entry_type_name']] += entry['entry_minutes'];
            }else {
                acc[entry['entry_type_name']] = entry['entry_minutes'];
            }
            return acc;
        }, {});
    }


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
                const newChartData = filterChartData(data);
                setPieData(newChartData);
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
        const projectIndex = projectsData.findIndex(project => project['project_id'] === newProject['project_id']);
        const newProjectsData = [...projectsData];
        newProjectsData[projectIndex] = newProject;
        setProjectsData(newProjectsData);
    }

    const addNewEntry = newEntry => {
        setEntriesData([...entriesData, newEntry]);
    }

    const updateEntriesData = newEntry => {
        const entryIndex = entriesData.findIndex(entry => entry['entry_id'] === newEntry['entry_id']);
        const newEntriesData = [...entriesData];
        newEntriesData[entryIndex] = newEntry;

        //const newEntriesData = entriesData.map(entry => entry['entry_id'] !== newEntry['entry_id'] ?  entry : newEntry);
        //if in current filter, add to that
        setFilteredEntriesData(newEntriesData);
        setEntriesData(newEntriesData);
    }

    const selectEntry = entryData => {
        setCurrentEntry(entryData);
    }

    const deleteEntry = entryData => {
        const newEntriesData = entriesData.filter(entry => entry['entry_id'] !== entryData['entry_id']);
        setEntriesData(newEntriesData);
    }
    const deleteProject = projectData => {
        const newProjectsData = projectsData.filter(project => project['project_id'] !== projectData['project_id']);
        setProjectsData(newProjectsData);
        const newEntriesData = entriesData.filter(entry => entry['project_id'] !== projectData['project_id']);
        setEntriesData(newEntriesData);
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
            const newChartData = filterChartData(entriesData);
            setPieData(newChartData);
        }else {
            const newFilteredEntries = entriesData.filter(entryData => newSet.has(entryData['project_id']));
            setFilteredEntriesData(newFilteredEntries);
            const newChartData = filterChartData(newFilteredEntries);
            setPieData(newChartData);
        }
    }

    const selectProject = projectData => {
        setCurrentProject(projectData);
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
                                <ProjectsMenuList
                                selectedProjectIDs={selectedProjectIDs}
                                selectProject={selectProject}
                                deleteProject={deleteProject}
                                projectsData={projectsData}
                                handleToggle={handleToggle}
                                />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <MaterialUI.Link component={Link} to="/login">Login</MaterialUI.Link>
                                <MaterialUI.Link component={Link} to="/register">Register</MaterialUI.Link>
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
                                        <React.Fragment>
                                            <StatsDisplay
                                            entriesData={filteredEntriesData}
                                            selectEntry={selectEntry}
                                            deleteEntry={deleteEntry}
                                            >
                                            </StatsDisplay>
                                            <PieChart 
                                            labels={Object.keys(pieData)}
                                            data={Object.values(pieData)}
                                            />
                                            <LineGraph
                                            entriesData={filteredEntriesData}
                                            />
                                        </React.Fragment>

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
                        <Route path="/register">
                            <React.Fragment>
                                <Box>
                                    <Register verifyUser={verifyUser}>
                                    </Register>
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