import { getJwt } from './authService';
import http from './httpService';
const apiEndPoint = "/auth/register";

export function register(user) {
    return http.post(apiEndPoint, {
        email: user.email,
        password: user.password,
        username: user.username
    });
}

function userUrl(id) {
    return `/users/${id}`;
}

export function getUser(id) {
    return http.get(userUrl(id));
}

export function getAllUsernames() {
    return http.get("/users", {}, { headers: { Authorization: getJwt() } });
}

export function getAllUsers() {
    return http.get("/users", {}, { headers: { Authorization: getJwt() } });
}

export function deleteUser(id) {
    return http.delete(userUrl(id), {}, { headers: { Authorization: getJwt() } });
}

export function updateUser(id, user) {
    return http.put(userUrl(id), user, { headers: { Authorization: getJwt() } });
}

export function getDefaultAvatar({ target }) {
    target.src = `${process.env.REACT_APP_S3_URL}default/images/user_avatar.jpg`;
}

export function getAvatar(userId) {
    return `${process.env.REACT_APP_S3_URL}users/${userId}/${userId}.jpg`;
}