import axios from "axios";

const URL = 'https://394c7c8d-7410-4a5e-9786-74676472ed4c.mock.pstmn.io/api'

export const getUserInfo = async () => {
    const response = await axios.get(`${URL}/profile`);
    return response.data
}

export const getHomePage = async () => {
    const response = await axios.get(`${URL}`);
    return response.data;
}