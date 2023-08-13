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

export const getAutoPick = async () => {
    const response = await axios.get(`${URL}/squad/autopick`);
    return response.data;
}

export const getPlayerList = async (pos) => {
    const response = await axios.get(`${URL}/squad/all/selectplayer/${pos}`);
    return response.data;
}

export const confirmSquad = async (team) => {
    const response = await axios.post(`${URL}/squad/build`, team);
    return response.data;
}

export const getPlayingXI = async (matchId) => {
    const response = await axios.get(`${URL}/playingxi/${matchId}`);
    return response.data;
}

export const confirmPlayingXI = async (team, matchId) => {
    const response = await axios.post(`${URL}/playingxi/${matchId}`, team);
    return response.data;
}