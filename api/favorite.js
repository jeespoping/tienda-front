import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function isFavoriteApi(idUser, idGame, logout) {
  try {
    const url = `${BASE_PATH}/favorites?user=${idUser}&game=${idGame}`;
    const response = await authFetch(url, null, logout);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
