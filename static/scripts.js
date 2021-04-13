const formInput = ids => {
    const entryObj = {};
    for(const id of ids){
        console.log(id);
        entryObj[id] = document.querySelector(`#${id}`).value
    }
    return entryObj;
};

const showResponseAndResetForm = response => {
    document.querySelector('.response-message').innerText = response.message;
    document.querySelectorAll('input, textarea').forEach(input=> {
        input.value = input.getAttribute('default-input-value');
    })
};

const addNewItem = (ids, url, evt, sucess) =>{
    evt.preventDefault();
    const entryInput = formInput(ids);
    console.log(JSON.stringify(entryInput));
    $.ajax ({
        url: url,
        type: 'POST',
        data: JSON.stringify(entryInput),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: sucess
    });
};