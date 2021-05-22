import { getJwt } from './authService';
import http from './httpService';

const apiEndPoint = '/tasks';

function taskUrl(id) {
    return `${apiEndPoint}/${id}`;
}

export function getTasks(groupId) {
    return http.get(apiEndPoint, { params: { groupId }, headers: { Authorization: getJwt() } });
}

export function getTask(taskId) {
    return http.get(taskUrl(taskId), { params: { taskId }, headers: { Authorization: getJwt() } });
}


export function postTask({ title, description, dueTime, completed, groupId, taskId = null }) {

    if (taskId !== null) {
        return updateTask({ title, description, dueTime, completed, taskId });
    }
    return http.post(apiEndPoint, { title, description, dueTime, completed }, { params: { groupId }, headers: { Authorization: getJwt() } });
}

export function deleteTask(id) {
    return http.delete(taskUrl(id), {}, { headers: { Authorization: getJwt() } });
}

export function updateTask({ title, description, dueTime, completed, taskId }) {
    return http.put(taskUrl(taskId), { title, description, dueTime, completed }, { headers: { Authorization: getJwt() } });
}