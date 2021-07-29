import axiosClient from './axiosClient';

const boardApi = {
    getAll: () => {
        const url = 'board';
        return axiosClient.get(url);
    },
    getById: (id) => {
        const url = `board/${id}`;
        return axiosClient.get(url);
    },
    getByOwnerId: (userId) => {
        const url = `board/owner/${userId}`;
        return axiosClient.get(url);
    },
    createNewBoard: (board) => {
        const url = 'board';
        return axiosClient.post(url, board);
    },
    updateBoard: (id, board) => {
        const url = `board/${id}`;
        return axiosClient.patch(url, board);
    },
    deleteBoard: (id) => {
        const url = `board/${id}`;
        return axiosClient.delete(url);
    }
};

export default boardApi;