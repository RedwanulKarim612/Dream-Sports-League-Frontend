import axios from "axios";

const URL = 'https://dream-sports-league.onrender.com/api'
// const URL = 'http://localhost:8080/api'

axios.defaults.withCredentials = true;

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

export const confirmLogin = async (credentials) => {
    console.log(credentials)
    const response = await axios.post(`${URL}/auth/login`, credentials);
    console.log(response);
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

export const getMatchDetails = async(matchId) => {
    const response = await axios.get(`${URL}/fixtures/match/${matchId}`);
    return response.data;
}

export const getFixtureDetails = async(gameWeek) => {
    const response = await axios.get(`${URL}/fixtures/${gameWeek}`);
    return response.data;
}