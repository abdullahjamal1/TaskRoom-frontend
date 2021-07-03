import { getJwt } from './authService';
import http from './httpService';

const apiEndPoint = '/tasks';

function taskUrl(id) {
    return `${apiEndPoint}/${id}`;
}

export function getTasks(groupId) {
    return http.get(apiEndPoint, { params: { groupId } });
}

export function getTask(taskId) {
    return http.get(taskUrl(taskId), { params: { taskId } });
}


export function postTask({ title, description, dueTime, completed, groupId, taskId = null }) {

    if (taskId !== null) {
        return updateTask({ title, description, dueTime, completed, taskId });
    }
    return http.post(apiEndPoint, { title, description, dueTime, completed }, { params: { groupId } });
}

export function deleteTask(id) {
    return http.delete(taskUrl(id));
}

export function updateTask({ title, description, dueTime, completed, taskId }) {
    return http.put(taskUrl(taskId), { title, description, dueTime, completed });
}