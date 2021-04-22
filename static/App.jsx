const { AppBar, Toolbar, Box, Typography } = MaterialUI;
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

    const updateProjects = newProject => {
        setProjectsData([...projectsData, newProject]);
    }

    const updateEntriesData = newEntry => {
        setEntriesData([...entriesData, newEntry]);
    }

    const onChange = e => {
        const selectedProject = e.target.value;
        setCurrentProject(selectedProject);
        if(selectedProject === 'all'){
            setFilteredEntriesData(entriesData);
        }else {
            const newFilteredData = entriesData.filter(entry => entry['project_id'] === selectedProject);
            setFilteredEntriesData(newFilteredData);
        }
    }

    return (
        <BrowserRouter>
            <Box className="App">
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        <Link to="/">Home</Link>
                        {userID ? (
                            <React.Fragment>
                                <Link to="/new-project">New Project</Link>
                                <Link to="/new-entry">New Entry</Link>
                                <FormControl style={{minWidth: 200}}>
                                <InputLabel id="project-filter-label">Project</InputLabel>
                                    <Select
                                    labelId="project-filter-label"
                                    value={currentProject}
                                    name="currentProject"
                                    onChange={e => onChange(e)}
                                    >
                                        <MenuItem 
                                        value={'all'}>
                                            All
                                        </MenuItem>
                                    {projectsData.map((projectData, index) => 
                                        <MenuItem 
                                        key={index} 
                                        value={projectData['project_id']}>
                                            {projectData['project_name']}
                                        </MenuItem>
                                    )}
                                    </Select>
                                </FormControl>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Link to="/login">Login</Link>
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
                                    updateProjects={updateProjects}
                                    >
                                    </CreateProject>
                                </Box>
                            </React.Fragment>
                        </Route>
                        <Route path="/new-entry">
                            <React.Fragment>
                                <Box>
                                    <CreateEntry
                                    entryTypes={entryTypes}
                                    updateEntriesData={updateEntriesData}
                                    projectsData={projectsData}
                                    >
                                    </CreateEntry>
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