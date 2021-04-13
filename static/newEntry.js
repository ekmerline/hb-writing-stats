document.querySelector('.new-entry-form').addEventListener('submit', evt => {
    const ids = ["entry_minutes", "entry_words", "entry_note", "entry_type_id", "project_id"];
    const url = '/api/entry'
    addNewItem(ids, url, evt, showResponseAndResetForm);
});
