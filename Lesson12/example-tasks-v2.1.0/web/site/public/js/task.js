function handleClickDelete(taskId, tokenClient) {
    console.log(taskId, tokenClient);
    
    // URI for the API:
    const uriDelete = `/tasks/${taskId}`;
    console.log(uriDelete);
    const options = { 
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${tokenClient}`
        }
    };
    console.log("options:", options);
    fetch(uriDelete, options)
        .then(response => {
            if (response.ok){
                console.log("Resp:", response);
                alert(`Task with id ${taskId} deleted`);
            }
            else {
                alert(`Error ${response.status} ${response.statusText}: ${response.body}`);
            }
            // Update the page:
            window.location = '/site/tasks';
        })
        .catch(err => {
            alert(`Task with id ${taskId} was not deleted: failed to connect to server!`);
        });
}

function handleClickUpdate(taskId, tokenClient) {
    console.log(taskId, tokenClient);
    const form = document.getElementById('formUpdateTask');
    const formDataTask = new FormData(form);

    // URI for the API:
    const uriUpdate = `/tasks/${taskId}`;
    console.log(uriUpdate);
    const options = { 
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${tokenClient}`
        },
        body: formDataTask
    };
    console.log("options:", options);
    fetch(uriDelete, options)
        .then(response => {
            if (response.ok){
                console.log("Resp:", response);
                alert(`Task with id ${taskId} updated`);
            }
            else {
                alert(`Error ${response.status} ${response.statusText}: ${response.body}`);
            }
            // Update the page:
            window.location = '/site/tasks';
        })
        .catch(err => {
            alert(`Task with id ${taskId} was not update: failed to connect to server!`);
        });
}