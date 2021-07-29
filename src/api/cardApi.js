import axiosClient from './axiosClient';

const cardApi = {
    getCard: (id) => {
        const url = `card/${id}`;
        return axiosClient.get(url);
    },
    getCardList: (list) => {
        const url = 'card/listCard';
        return axiosClient.post(url, {
            list: list
        });
    },
    createCard: (card) => {
        const url = 'card/';
        return axiosClient.post(url, card);
    },
    updateCard: (id, card) => {
        const url = `card/${id}`;
        return axiosClient.patch(url, card);
    },
    deleteCard: (id) => {
        const url = `card/${id}`;
        return axiosClient.delete(url);
    }
};

export default cardApi;