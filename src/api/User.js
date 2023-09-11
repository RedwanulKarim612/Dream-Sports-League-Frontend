import axios from "axios";

// const URL = 'https://dream-sports-league.onrender.com/api'
const URL = 'http://localhost:8080/api'

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

export const getTransferInfo = async () => {
    const response = await axios.get(`${URL}/transferwindow`);
    return response.data;
}
export const confirmLogin = async (credentials) => {
    console.log(credentials)
    const response = await axios.post(`${URL}/auth/login`, credentials);
    console.log(response);
    return response.data;
}

export const confirmRegister = async (credentials) => {
    console.log(credentials)
    const response = await axios.post(`${URL}/auth/register`, credentials);
    console.log(response);
    return response.data;
}

export const getEPLTeams = async () => {
    console.log("getEPLTeams")
    const response = await axios.get(`${URL}/epl/teams`);
    console.log(response);
    return response.data;
}

export const userLogout = async () => {
    const response = await axios.post(`${URL}/auth/logout`);
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

export const getFLHome = async() => {
    const response = await axios.get(`${URL}/friendsleague`);
    return response.data;
}

export const createFL = async(league) => {
    const response = await axios.post(`${URL}/friendsleague/create`, league);
    return response.data;
}

export const getFLList = async() => {
    const response = await axios.get(`${URL}/friendsleague/all`);
    return response.data;
}

export const requestJoinFL = async(leagueId) => {
    const response = await axios.post(`${URL}/friendsleague/join`, leagueId);
    return response.data;
}

export const getTeamStats = async() => {
    const response = await axios.get(`${URL}/stats/teams`);
    return response.data;
}

export const getPlayerStats = async() => {
    const response = await axios.get(`${URL}/stats/players`);
    return response.data;
}

export const getDPLStandings = async() => {
    const response = await axios.get(`${URL}/stats/standings`);
    return response.data;
}

export const getJoinRequests = async(id) => {
    const response = await axios.get(`${URL}/friendsleague/${id}/requests`);
    return response.data;
}

export const handleRequest = async(flId, req) => {
    const response = await axios.post(`${URL}/friendsleague/${flId}/requests`, req);
    return response.data;
}

export const getTransferWindow = async() => {
    const response = await axios.get(`${URL}/transferwindow`);
    console.log(response.data);
    return response.data;
}

export const confirmTransfer = async(transfer) => {
    const response = await axios.post(`${URL}/transferwindow`, transfer);
    return response.data;
}

export const getFLFixture = async(id) => {
    const response = await axios.get(`${URL}/friendsleague/${id}/fixture`);
    return response.data;
}

export const getFLStandings = async(id) => {
    const response = await axios.get(`${URL}/friendsleague/${id}/standings`);
    return response.data;
}

export const getFLInfo = async(id) => {
    const response = await axios.get(`${URL}/friendsleague/${id}`);
    return response.data;
}

export const getFLStartingTeam = async(id, req) => {
    console.log(req)
    const response = await axios.post(`${URL}/friendsleague/${id}/playingxi`, req);
    return response.data;
}

export const setFLStartingTeam = async(id, req) => {
    const response = await axios.post(`${URL}/friendsleague/${id}/playingxi/edit`, req);
    return response.data;
}

export const getMyFLMatches = async(id) =>{
    const response = await axios.get(`${URL}/friendsleague/${id}/mymatches`);
    return response.data;
}

export const getIsLogin = async() => {
    const response = await axios.get(`${URL}/profile/islogin`);
    return response.data;
}