import axiosClient from './axiosClient';

const authApi =  {
    googleLogin: (tokenId) => {
        const url = 'auth/google';
        return axiosClient.post(url, {tokenId: tokenId});
    },
    facebookLogin: (data) => {
        const url = 'auth/facebook';
        return axiosClient.post(url, data);
    }
}

export default authApi;