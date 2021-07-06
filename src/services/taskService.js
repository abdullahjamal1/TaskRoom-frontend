import { getJwt } from './authService';
import http from './httpService';

const apiEndPoint = '/tasks';

function taskUrl(id) {
    return `${apiEndPoint}/${id}`;
}

export function getTasks(groupId) {
    return http.get(apiEndPoint, { params: { groupId } });
}

export function getTask(taskId, groupId) {
    return http.get(taskUrl(taskId), { params: { groupId } });
}


export function postTask(groupId, task) {

    return http.post(apiEndPoint, task, { params: { groupId } });
}

export function deleteTask(id) {
    return http.delete(taskUrl(id));
}

export function updateTask(taskId, groupId, task) {
    return http.put(taskUrl(taskId), task, { params: { groupId } });
}