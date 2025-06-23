import axios from 'axios';

export const axiosInstance = axios.create({});

export const apiConnector = async (method, url, bodyData, headers, params) => {
    try {
        const config = {
            method: method,
            url: url,
            data: bodyData ? bodyData : undefined, 
            headers: headers ? headers : undefined, 
            params: params ? params : undefined,
        };

        const response = await axiosInstance(config);
        return response.data;
    } catch (error) {
        throw error;
    }
};
