import axios from 'axios';

const getAllEmailsSend = async () => {
    try {
        const response = await axios.get(`/api/admin/getAllEmails`, {});
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const getRiskEmails = async () => {
    try {
        const response = await axios.get(`/api/admin/getRiskEmails`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const getBlacklistUsers = async () => {
    try {
        const response = await axios.get(`/api/admin/getBlacklistUsers`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const blacklistUser = async (userId) => {
    try {
        const response = await axios.put(`/api/admin/blacklistUser/${userId}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const unblacklistUser = async (userId) => {
    try {
        const response = await axios.put(`/api/admin/unblacklistUser/${userId}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const getEmailById = async (emailId) => {
    try {
        const response = await axios.get(`/api/admin/getEmail/${emailId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export {
    getAllEmailsSend,
    getRiskEmails,
    getBlacklistUsers,
    blacklistUser,
    unblacklistUser,
    getEmailById
}; 