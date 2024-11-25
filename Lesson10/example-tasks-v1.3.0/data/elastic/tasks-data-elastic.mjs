import { errors } from "../../commons/errors.mjs";
import { fetchElastic } from './fetch-elastic.mjs';

// FUNCTIONS (Tasks API Data):

export default function init(){

    return {
        verifyNewTaskProperties,
        getAllTasks,
        getTask,
        addTask,
        updateTask,
        deleteTask
    };

    function aTaskFromElastic(elasticTask) {
        //console.log("Elastic:", elasticTask);
        let task = Object.assign({id: elasticTask._id}, elasticTask._source);
        return task;
    }

    function verifyNewTaskProperties(newTask) {
        // Only title is mandatory.
        if (newTask.title) return true;
        else return false;
    }

    // Returns a Promise of a task
    function getTask(taskId) {
        return fetchElastic('GET', '/tasks/_doc/' + taskId)
            .then(elasticTask => {
                if(elasticTask.found)
                    return aTaskFromElastic(elasticTask);
                else 
                    return Promise.reject(errors.TASK_NOT_FOUND(taskId));
            });
    }

    function getAllTasks(userId) {
        const filter = {
            query: {
            match: {
                userId: userId
            }
            }
        };
        return fetchElastic('POST', '/tasks/_search', filter)
            .then(resp => resp.hits.hits)
            .then(tasks => tasks.map(aTaskFromElastic));
    }

    function addTask(newTask, userId) {
        newTask.userId = userId;

        return fetchElastic('POST', '/tasks/_doc', newTask)
            .then(body => {
                    newTask.id = body._id;
                    return(newTask);
                }
            );
    }

    function deleteTask(idTask) {
        return fetchElastic('DELETE', '/tasks/_doc/' + idTask)
            .then(body => {
                if(body.result != 'not_found')
                    return(body._id);
                else 
                    return Promise.reject(errors.TASK_NOT_FOUND(taskId));
            });
    }

    function updateTask(idTask, newTask) {
        return fetchElastic('PUT', '/tasks/_doc/' + idTask, newTask)
            .then(aTaskFromElastic);
    }
}
