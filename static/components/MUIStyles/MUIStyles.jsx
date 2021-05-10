const { createMuiTheme, makeStyles, ThemeProvider } = MaterialUI;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5e91f2',
      main: '#1564bf',
      dark: '#003b8e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#b6ffff',
      main: '#81d4fa',
      dark: '#4ba3c7',
      contrastText: '#000',
    },
  },
});

const defaultBoxProps = {
    bgcolor: 'background.paper',
    m: 1,
    border: 1,

  };

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: '2vh',
      marginLeft: '2vh',
      // [theme.breakpoints.down('sm')]: {
      //   height: '300px',
      // },
      // [theme.breakpoints.up('md')]: {
      //   height: '350px',
      // },
      [theme.breakpoints.up('lg')]: {
        height: '41vh',
      },
    },
    pieBox: {

      // [theme.breakpoints.down('sm')]: {
      //   height: '300px',
      // },
      // [theme.breakpoints.up('md')]: {
      //   height: '350px',
      // },
      // [theme.breakpoints.up('lg')]: {
      //   height: '40vh',
      // },
    },
    lineGraphBox: {
      marginRight: '2vh',
      // [theme.breakpoints.down('sm')]: {
      //   height: '300px',
      // },
      // [theme.breakpoints.up('md')]: {
      //   height: '350px',
      // },
      // [theme.breakpoints.up('lg')]: {
      //   height: '42vh',
      // },
    },
    projectBox: {
      // [theme.breakpoints.down('sm')]: {
      //   height: '350px',
      // },
      // [theme.breakpoints.up('md')]: {
      //   height: '400px',
      // },
      // [theme.breakpoints.up('lg')]: {
      //   height: '42vh',
      // },
    },
    projectInnerBox: {
      height: '80%',
    },
    entryTableBox: {
      marginBottom: '2vh',
      // [theme.breakpoints.down('sm')]: {
      //   height: '350px',
      // },
      // [theme.breakpoints.up('md')]: {
      //   height: '400px',
      // },
      [theme.breakpoints.up('lg')]: {
        width: '80vw',
      },
    },
    loginBox: {
      marginTop: '10vh',
      padding: '5vh',
      opacity: 0.8,
      height: '250px',
      width:  '250px',
      // [theme.breakpoints.down('sm')]: {
      //   height: '350px',
      // },
      // [theme.breakpoints.up('md')]: {
      //   height: '400px',
      // },
      // [theme.breakpoints.up('lg')]: {
      //   height: '250px',
      //   width:  '250px'
      // },
    },
    borderBox: {
      border: 1,
      borderColor: 'black'
    },
    entryTable: {
      height: '90%',
      width: '100%'
    },
    entryTableHead: {
      fontWeight: 600,
      backgroundColor: theme.palette.secondary.main
    },
    entryTableData: {
      overflow: 'auto'
    },
    buttonStyles: {
      margin: "3px"
    },
    projectBoxBottom: {
      height: '7vh',
    },
    projectBoxData: {
      marginBottom: '2vh',
      marginLeft: '2vh'
    },
    projectBoxMiddle: {
      height: '29vh',
    },
    projectBoxTop: {
      height: '5vh',
      backgroundColor: theme.palette.secondary.main
    },
    editDeleteButtons: {
      minWidth: '0px'
    },
    projectMenuItem: {
      minWidth: '400px'
    }
  }));