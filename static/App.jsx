const { AppBar, Toolbar, Box, Typography } = MaterialUI;
const { BrowserRouter, Link, Switch, Route } = ReactRouterDOM;
const { useState } = React;

const App = () => {

    const [userID, setUserID ] = useState(null);

    const verifyUser = () => {
        setUserID(sessionStorage.getItem('user_id'));
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
                                    The main page!
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
                                    The new project page!
                                </Box>
                            </React.Fragment>
                        </Route>
                        <Route path="/new-entry">
                            <React.Fragment>
                                <Box>
                                    The new entry page!
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