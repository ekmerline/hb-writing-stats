const loginSuccess = response => {
    if(response.message === 'Success'){
        window.location.replace('/');
        // document.querySelector('.login-form').style.display = 'none';
        // const messageDiv = document.querySelector('.response-message');
        // const messageSpan = document.createElement('span');
        // const redirectLink = document.createElement('a');
        // redirectLink.href = '/';
        // redirectLink.innerText = ' Stats Page.';
        // messageSpan.appendChild(document.createTextNode(`${response.message}! Go to`));
        // messageSpan.appendChild(redirectLink);
        // messageDiv.appendChild(messageSpan);
    }else {
        document.querySelector('.response-message').innerText = response.message;
    }
};

document.querySelector('.login-form').addEventListener('submit', evt => {
    const ids = ['user_name', 'password'];
    const url = '/api/login';
    addNewItem(ids, url, evt, loginSuccess);
});
