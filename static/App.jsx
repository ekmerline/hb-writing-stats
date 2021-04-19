const { AppBar, Toolbar, Box, Typography } = MaterialUI;
const { BrowserRouter, Link, Switch, Route } = ReactRouterDOM;

const App = () => {

    return (
        <BrowserRouter>
            <Box className="App">
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography>
                            <Link to="/">Home</Link>
                        </Typography>
                        <Typography>
                            <Link to="/login">Login</Link>
                        </Typography>
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
                                    The login page!
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