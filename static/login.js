const loginSuccess = response => {
    if(response.message === 'Success'){
        localStorage.setItem('user', response.user_id);
        window.location.replace('/');
    }else {
        document.querySelector('.response-message').innerText = response.message;
    }
};

document.querySelector('.login-form').addEventListener('submit', evt => {
    const ids = ['user_name', 'password'];
    const url = '/api/login';
    addNewItem(ids, url, evt, loginSuccess);
});
