const { TableContainer, Table, TableHead, TableBody, TableRow, TableCell} = MaterialUI;

const StatsDisplay = ({entriesData}) => {
    return (
    <TableContainer>
      <Table aria-label="entry stats table">
        <TableHead>
          <TableRow>
          <TableCell align="left">Project Name</TableCell>
            <TableCell align="right">Entry Type</TableCell>
            <TableCell align="right">Minutes</TableCell>
            <TableCell align="right">Words</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entriesData.map(entryData => (
            <TableRow key={entryData['entry_id']}>
              <TableCell component="th" scope="row">
                {entryData['project_name']}
              </TableCell>
              <TableCell align="right">{entryData['entry_type_name']}</TableCell>
              <TableCell align="right">{entryData['entry_minutes']}</TableCell>
              <TableCell align="right">{entryData['entry_words']}</TableCell>
              <TableCell align="right">{entryData['entry_datetime']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}