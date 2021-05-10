const { ThemeProvider, Grid, AppBar, Toolbar, Box, Typography, Checkbox, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, IconButton, Button, Menu, MenuItem, Tab, Tabs, Link } = MaterialUI;
const { BrowserRouter, Switch, Route } = ReactRouterDOM;
const { useState, useEffect } = React;

const App = () => {

    const [userID, setUserID ] = useState(null);
    const [projectsData, setProjectsData] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);
    const [entryTypes, setEntryTypes] = useState([]);
    const [entriesData, setEntriesData] = useState([]);
    const [filteredEntriesData, setFilteredEntriesData] = useState([]);
    const [currentProject, setCurrentProject] = useState('');
    const [selectedProjectIDs, setSelectedProjectIDs] = useState(new Set());


    const loadData = user_id => {
        fetch(`http://localhost:5000/api/projects/${user_id}`, {
            method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                setProjectsData(data);
                //query should be sorted in a way first will always be most recent
                if(data.length > 0 ){
                    setCurrentProject(data[0]);
                    const newSet = selectedProjectIDs.add(data[0]['project_id']);
                    setSelectedProjectIDs(newSet);
                }
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
                if (data.length > 0){
                    const mostRecentProjectID = data[0]['project_id'];
                    const filteredData = data.filter(entry => entry['project_id'] === mostRecentProjectID);
                    setFilteredEntriesData(filteredData);
                }else {
                    setFilteredEntriesData(data);
                }

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
    const verifyUser = user_id => {
        setUserID(user_id);
        loadData(user_id);
        
    }

    const addNewProject = newProject => {
        setProjectsData([newProject, ...projectsData]);
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
        if(selectedProjectIDs.has(newEntry['project_id'])){
            setFilteredEntriesData([newEntry, ...filteredEntriesData]);
        }
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
        const newFilteredEntriesData = filteredEntriesData.filter(entry => entry['entry_id'] !== entryData['entry_id'])
        setEntriesData(newEntriesData);
        setFilteredEntriesData(newFilteredEntriesData);
    }
    const deleteProject = projectData => {
        const newProjectsData = projectsData.filter(project => project['project_id'] !== projectData['project_id']);
        setProjectsData(newProjectsData);
        const newEntriesData = entriesData.filter(entry => entry['project_id'] !== projectData['project_id']);
        setEntriesData(newEntriesData);

        const newFilteredEntriesData = filteredEntriesData.filter(entry => entry['project_id'] !== projectData['project_id']);
        setFilteredEntriesData(newFilteredEntriesData);

        setCurrentProject(newProjectsData[0]);

        if(selectedProjectIDs.has(projectData['project_id'])){
            const newSet = new Set(selectedProjectIDs);
            newSet.delete(projectData['project_id']);
            setSelectedProjectIDs(newSet);
        }
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
        }else {
            const newFilteredEntries = entriesData.filter(entryData => newSet.has(entryData['project_id']));
            setFilteredEntriesData(newFilteredEntries);
        }
    }

    const handleProjectsFillerAll = all => {
        if(all){
            const newSet = new Set();
            for(const project of projectsData){
                newSet.add(project['project_id']);
            }
            setSelectedProjectIDs(newSet);
            setFilteredEntriesData(entriesData);
        }else {
            setSelectedProjectIDs(new Set());
            const newFilteredEntriesData = entriesData.filter(entry => entry['project_id'] === currentProject['project_id']);
            setFilteredEntriesData(newFilteredEntriesData);
        }
    }

    const selectProject = projectData => {
        setCurrentProject(projectData);
    }

    const logout = () => {
        sessionStorage.clear();
        setUserID(null);
        setProjectsData([]);
        setProjectTypes([]);
        setEntryTypes([]);
        setEntriesData([]);
        setFilteredEntriesData([]);
        setCurrentProject({});
        setSelectedProjectIDs(new Set());    
    }


    return (
        <ThemeProvider theme={theme}>
            <Box className="App" height="100vh">
                <AppBar position="static" color="primary" height="10vh">
                    <Toolbar>
                        {userID ? (
                            <React.Fragment>
                                <Box flexGrow={1} component="span">Welcome, {sessionStorage.getItem('user_name')}</Box>
                                <Button onClick={logout} color="inherit">Log out</Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                            Welcome to the Writing Stats Tracker!
                            </React.Fragment>
                        )}
                    </Toolbar>
                </AppBar>
                <Box className="main" bgcolor="secondary.dark" height="100%" m={0}>
                                    {userID ? (
                                        <Grid container spacing={2} bgcolor="secondary.dark">
                                            <ProjectBox
                                            handleProjectsFillerAll={handleProjectsFillerAll}
                                            userID={userID}
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
                                            entriesData={filteredEntriesData}
                                            />
                                            <LineGraph
                                            entriesData={filteredEntriesData}
                                            />
                                            <EntryTableBox
                                            entriesData={filteredEntriesData}
                                            deleteEntry={deleteEntry}
                                            projectsData={projectsData}
                                            entryTypes={entryTypes}
                                            updateEntries={updateEntriesData}
                                            />
                                        </Grid>
                                    ) : (
                                    <Box   
                                    display="flex" 
                                    justifyContent="center" 
                                    style={{backgroundImage: `url(${"http://localhost:5000/static/images/typewriterfade2.jpeg"})`, 
                                    height: "100vh", 
                                    width: "100vw", 
                                    position: "fixed"}}>
                                        <LoginRegister verifyUser={verifyUser}/>
                                    </Box>
                                    )}
                </Box>
            </Box>
        </ThemeProvider>

    )
}

ReactDOM.render(<App />, document.querySelector('#root'));