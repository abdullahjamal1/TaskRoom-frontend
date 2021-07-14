import { getJwt } from './authService';
import http from './httpService';

const apiEndPoint = "/groups";

function groupUrl(id) {
    return `${apiEndPoint}/${id}`;
}
export function getGroups() {
    return http.get(apiEndPoint);
}

export function getGroup(groupId) {
    return http.get(groupUrl(groupId));
}

export function getAllFiles(groupId) {
    return http.get('/files', { params: { groupId } });
}

export function leaveGroup(groupId){
    return http.get(`${groupUrl(groupId)}/leave`);
}
export function saveGroup(title,
    description,
    theme,
    members,
    admins) {

    return http.post(apiEndPoint, {
        title,
        description,
        theme,
        members,
        admins
    });

}

export function updateGroup(title,
    description,
    theme,
    members, _id) {

    return http.put(groupUrl(_id), {
        title,
        description,
        theme,
        members
    }, { headers: { 'x-auth-token': getJwt() } });

}


export function deleteGroup(groupId) {
    return http.delete(groupUrl(groupId));
}
