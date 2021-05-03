const { Grid, AppBar, Toolbar, Box, Typography, Checkbox, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, IconButton, Button, Menu, MenuItem, Tab, Tabs, Link } = MaterialUI;
const { BrowserRouter, Switch, Route } = ReactRouterDOM;
const { useState } = React;

const App = () => {

    const [userID, setUserID ] = useState(null);
    const [projectsData, setProjectsData] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);
    const [entryTypes, setEntryTypes] = useState([]);
    const [entriesData, setEntriesData] = useState([]);
    const [filteredEntriesData, setFilteredEntriesData] = useState([]);
    const [currentProject, setCurrentProject] = useState({});
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
                //query should be sorted in a way first will always be most recent
                setCurrentProject(data[0]);
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
        setCurrentProject(newProject);
    }

    const updateProject = newProject => {
        const projectIndex = projectsData.findIndex(project => project['project_id'] === newProject['project_id']);
        const newProjectsData = [...projectsData];
        newProjectsData[projectIndex] = newProject;
        setProjectsData(newProjectsData);
        setCurrentProject(newProject);
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

    const handleProjectsFilter = projectID => {
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

    const logout = () => {
        sessionStorage.clear();
        setUserID(null);
    }


    return (
            <Box className="App">
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        {userID ? (
                            <React.Fragment>
                            Welcome to the Writing Stats Tracker!
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Button onClick={logout}>Log out</Button>
                            </React.Fragment>
                        )}
                    </Toolbar>
                </AppBar>
                <Box className="main">
                            <React.Fragment>
                                <Box>
                                    {userID ? (
                                        <Grid container spacing={2}>
                                            <ProjectBox
                                            projectsData={projectsData}
                                            currentProject={currentProject}
                                            updateProject={updateProject}
                                            projectTypes={projectTypes}
                                            addNewProject={addNewProject}
                                            entryTypes={entryTypes}
                                            addNewEntry={addNewEntry}
                                            handleProjectsFilter={handleProjectsFilter}
                                            selectProject={selectProject}
                                            selectedProjectIDs={selectedProjectIDs}
                                            deleteProject={deleteProject}
                                            />
                                            <PieChart 
                                            labels={Object.keys(pieData)}
                                            data={Object.values(pieData)}
                                            />
                                            <EntryTableBox
                                            entriesData={filteredEntriesData}
                                            deleteEntry={deleteEntry}
                                            projectsData={projectsData}
                                            entryTypes={entryTypes}
                                            updateEntries={updateEntriesData}
                                            />
                                            <LineGraph
                                            entriesData={filteredEntriesData}
                                            />
                                        </Grid>
                                    ) : (
                                    <Box>
                                        <LoginRegister verifyUser={verifyUser}/>
                                    </Box>
                                    )}
                                </Box>
                            </React.Fragment>
                </Box>
            </Box>

    )
}

ReactDOM.render(<App />, document.querySelector('#root'));