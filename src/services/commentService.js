import http from './httpService';
import { getJwt } from './authService';

const apiEndPoint = "/comments";

export function getComments({ taskId, groupId, parentId = -1 }) {
    return http.get(apiEndPoint, { params: { parentId, taskId, groupId } });
}

export function postComment({ message, taskId, parentId, groupId }) {
    console.log(message);
    return http.post(apiEndPoint, { message }, { params: { parentId, taskId, groupId } });
}
