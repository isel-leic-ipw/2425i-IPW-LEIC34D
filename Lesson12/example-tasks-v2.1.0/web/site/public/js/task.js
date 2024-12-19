function handleClickDelete(taskId, taskTitle, tokenClient) {
    //console.log(taskId, tokenClient);
    
    // URI for the API:
    const uriDelete = `/tasks/${taskId}`;
    //console.log(uriDelete);
    const options = { 
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${tokenClient}`
        }
    };
    //console.log("options:", options);
    const messages = {
        ok: `Task '${taskTitle}' was deleted!`,
        error: `Task '${taskTitle}' was NOT deleted!`
    }
    fetchWebApi(uriDelete, options, messages);
}

function handleClickUpdate(taskId, taskTitle, tokenClient) {
    //console.log(taskName, tokenClient);

    const form = document.getElementById('formUpdateTask');
    const formDataTask = new FormData(form);

    const jsonDataTask = convertFormDataToJson(formDataTask);

    // URI for the API:
    const uriUpdate = form.getAttribute('action');
    //console.log("uriUpdate:", uriUpdate);
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${tokenClient}`,
            'Content-Type': 'application/json'
        },
        body: jsonDataTask
    };
    const messages = {
        ok: `Task '${taskTitle}' was updated!`,
        error: `Task '${taskTitle}' was NOT updated!`
    }
    fetchWebApi(uriUpdate, options, messages);
}

function fetchWebApi(uri, options, messages){
    //console.log(uri);
    //console.log(options);
    fetch(uri, options)
        .then(response => {
            if (response.ok){
                console.log("Resp:", response);
                alert(messages.ok);
            }
            else {
                response.json().then(json => {
                    console.log(json);
                    alert(`Error ${response.status} ${response.statusText}: ${json.error} (code: ${json.code})`)
                }
                );
            }
            // Update the page:
            window.location = '/site/tasks';
        })
        .catch(err => {
            alert(messages.error);
        });
}

function convertFormDataToJson(formData){
    // Convert formDataTask to JSON:
    let object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    return JSON.stringify(object);
}