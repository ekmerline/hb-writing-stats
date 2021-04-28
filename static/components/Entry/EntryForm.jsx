const { TextField, Button, FormControl, InputLabel, Select, MenuItem  } = MaterialUI;

const EntryForm = ({onSubmit, onChange, entryTypes, projectsData, entry_minutes, entry_words, entry_type_id, entry_note, project_id, buttonText}) => {

    return (
        <form>
            <div>
                <TextField 
                    required 
                    type="number"
                    name="entry_minutes"
                    label="Entry Minutes" 
                    value={entry_minutes} 
                    onChange={e => onChange(e)}
                />
            </div>
            <div>
                <TextField 
                    required 
                    type="number"
                    name="entry_words"
                    label="Entry Words" 
                    value={entry_words} 
                    onChange={e => onChange(e)}
                />
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
                <FormControl style={{minWidth: 200}}>
                    <InputLabel id="project-label">Project</InputLabel>
                    <Select
                    labelId="project-label"
                    value={project_id}
                    name="project_id"
                    onChange={e => onChange(e)}
                    >
                    {projectsData.map((projectData, index) => 
                        <MenuItem 
                        key={index} 
                        value={projectData['project_id']}>
                            {projectData['project_name']}
                        </MenuItem>
                    )}
                    </Select>
                </FormControl>
            </div>
            <div>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={onSubmit}>
                        {buttonText}
                </Button>
            </div>

        </form>
    )
}