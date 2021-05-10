const { TextField, Button, FormControl, InputLabel, Select, MenuItem  } = MaterialUI;

const EntryForm = ({onSubmit, onChange, entryTypes, entry_minutes, entry_words, entry_type_id, entry_note, buttonText}) => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Box className={classes.projectBoxMiddle}>  
            <Box>
                <TextField 
                    required 
                    type="number"
                    name="entry_minutes"
                    label="Entry Minutes" 
                    value={entry_minutes} 
                    onChange={e => onChange(e)}
                />
            </Box>
            <Box>
                <TextField 
                    required 
                    type="number"
                    name="entry_words"
                    label="Entry Words" 
                    value={entry_words} 
                    onChange={e => onChange(e)}
                />
            </Box>
            <Box>
                <TextField
                    required
                    multiline
                    name="entry_note"
                    label="Entry Note"
                    rows={5}
                    placeholder="Entry Note"
                    value={entry_note}
                    onChange={e => onChange(e)}
                />
            </Box>
            <Box>
                <FormControl style={{minWidth: 200}}>
                    <InputLabel id="entry-type-label">Entry Type</InputLabel>
                    <Select
                    labelId="entry-type-label"
                    value={entry_type_id}
                    name="entry_type_id"
                    onChange={e => onChange(e)}
                    >
                    {entryTypes.map((entryType, index) => 
                        <MenuItem 
                        key={index} 
                        value={entryType['entry_type_id']}>
                            {entryType['entry_type_name']}
                        </MenuItem>
                    )}
                    </Select>
                </FormControl>
            </Box>
            </Box>
            <Box className={classes.projectBoxBottom}>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={onSubmit}>
                        {buttonText}
                </Button>
            </Box>
        </React.Fragment>
    )
}