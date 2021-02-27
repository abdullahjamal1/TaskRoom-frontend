import http from './httpService';
import { getJwt } from './authService';

const apiEndPoint = "/comments";

export function getComments(taskId, parentId = -1) {
    return http.get(apiEndPoint, { params: { parentId, taskId }, headers: { Authorization: getJwt() } });
}

export function postComment(comment, taskId, parentId) {
    return http.post(apiEndPoint, comment, { params: { parentId, taskId }, headers: { 'Authorization': getJwt() } });
}
