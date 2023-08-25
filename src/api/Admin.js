import axios from "axios";

const URL = 'https://dream-sports-league.onrender.com/api'
// const URL = 'http://localhost:8080/api'

axios.defaults.withCredentials = true;

export const confirmAdminLogin = async (credentials) => {
    console.log(credentials)
    const response = await axios.post(`${URL}/auth/login`, credentials);
    console.log(response);
    return response.data;
}

export const getWeekMatches = async(gw) => {
    const response = await axios.get(`${URL}/admin/matchweek/${gw}`);
    return response.data;
}

export const postMatchToBeSimulated = async(matchId) => {
    const response = await axios.post(`${URL}/admin/matchweek/${matchId}`);
}