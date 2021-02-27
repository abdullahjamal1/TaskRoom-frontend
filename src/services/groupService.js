import { getJwt } from './authService';
import http from './httpService';

const apiEndPoint = "/groups";

function groupUrl(id) {
    return `${apiEndPoint}/${id}`;
}
export function getGroups() {
    return http.get(apiEndPoint, { headers: { Authorization: getJwt() } });
}

export function getGroup(groupId) {
    return http.get(groupUrl(groupId), { headers: { Authorization: getJwt() } });
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
    }, { headers: { Authorization: getJwt() } });

}

export function updateGroup(title,
    description,
    theme,
    members,
    admins, _id) {

    return http.put(groupUrl(_id), {
        title,
        description,
        theme,
        members,
        admins
    }, { headers: { Authorization: getJwt() } });

}


export function deleteGroup(groupId) {
    return http.delete(groupUrl(groupId));
}
