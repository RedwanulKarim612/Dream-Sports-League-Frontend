import axios from "axios";

const URL = 'http://localhost:8080/api'

export const getUserInfo = async () => {
    const response = await axios.get(`${URL}/profile`);
    return response.data
}

export const getHomePage = async () => {
    const response = await axios.get(`${URL}`);
    return response.data;
}

export const getBuildSquad = async () => {
    const response = await axios.get(`${URL}/squad`);
    return response.data;
}

export const getPlayerList = async (pos) => {
    const response = await axios.get(`${URL}/squad/selectplayer/${pos}`);
    return response.data;
}

export const confirmSquad = async (team) => {
    const response = await axios.post(`${URL}/squad`, team);
    return response.data;
}