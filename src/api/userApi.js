import axiosClient from './axiosClient';

const userApi = {
    login: (user) => {
        const url = 'user/login';
        return axiosClient.post(url, user);
    },
    checkLogin: () => {
        const url = 'user/checkLogin';
        return axiosClient.post(url);
    },
    register: (user) => {
        const url = 'user/register';
        return axiosClient.post(url, user); 
    },
    getUser: (userId) => {
        const url = `user/${userId}`;
        return axiosClient.get(url);
    },
    changePassword: (data) => {
        const url = 'user/changePassword';
        return axiosClient.post(url, data);
    },
    updateUser: (id, user) => {
        const url = `user/${id}`;
        return axiosClient.patch(url, user);
    }
};

export default userApi;