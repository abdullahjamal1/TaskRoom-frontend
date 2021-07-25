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

export function deleteTask(taskId, groupId) {
    return http.delete(taskUrl(taskId), { params: { groupId } });
}

export function updateTask(taskId, groupId, task) {
    return http.put(taskUrl(taskId), task, { params: { groupId } });
}

export function uploadFile(taskId, groupId, file) {
    return http.post('/files', file, { params: { taskId, groupId } });
}

export function deleteFile(fileId, taskId, groupId) {
    return http.delete(`/files/${fileId}`, { params: { taskId, groupId } });
}