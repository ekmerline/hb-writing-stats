const { FormControl, InputLabel, Select, MenuItem } = MaterialUI;

const EntryTypeDropdown = ({entryTypes, entry_type_id, onChange}) => {
    return (
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
    )
}