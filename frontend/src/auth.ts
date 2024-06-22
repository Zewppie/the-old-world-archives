import axiosInstance from './axiosConfig';

export const getCurrentUser = async () => {
    try {
        const response = await axiosInstance.get('/auth/me');
        return response.data;
    } catch (error) {
        console.error('Error getting user information:', error);
        return null;
    }
};
