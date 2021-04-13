document.querySelector('.new-project-form').addEventListener('submit', evt => {
    const ids = ['project_name', 'project_description', 'project_type_id'];
    const url = '/api/project';
    addNewItem(ids, url, evt, showResponseAndResetForm);
});
