import SGDB from 'steamgriddb'

const client = new SGDB({
  key: 'put your steam grid API key here',
  baseURL: '/steamgriddb'
})

// search for games
export const searchGameService = async (data) => await client.searchGame(data)

// get game grid by game id
export const getGameGridByIdService = async (data) => await client.getGridsById(data)

// get game grid by steam app id
export const getGameGridByAppIdService = async (data) => await client.getGridsBySteamAppId(data)
