const { useHistory } = ReactRouterDOM;
const { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button} = MaterialUI;

const StatsDisplay = ({entriesData, deleteEntry, projectsData, entryTypes, updateEntries}) => {

  const classes = useStyles();
    return (
    <TableContainer className={classes.entryTable}>
      <Table aria-label="entry stats table" stickyHeader>
        <TableHead className={classes.entryTableHead}>
          <TableRow>
          <TableCell align="left" className={classes.entryTableHead}>Project Name</TableCell>
          <TableCell align="right" className={classes.entryTableHead}>Entry Notes</TableCell>
            <TableCell align="right" className={classes.entryTableHead}>Entry Type</TableCell>
            <TableCell align="right" className={classes.entryTableHead}>Minutes</TableCell>
            <TableCell align="right" className={classes.entryTableHead}>Words</TableCell>
            <TableCell align="right" className={classes.entryTableHead}>Date</TableCell>
            <TableCell align="right" className={classes.entryTableHead}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.entryTableData}>
          {entriesData.map(entryData => (
            <StatsTableRow 
            key={entryData['entry_id']}
            entryData={entryData}
            deleteEntry={deleteEntry}
            projectsData={projectsData}
            entryTypes={entryTypes}
            updateEntries={updateEntries}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}