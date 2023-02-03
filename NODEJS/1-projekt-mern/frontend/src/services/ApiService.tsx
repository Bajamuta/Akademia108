import axios from "axios";
import {API_ALL_CITIES, API_ALL_EVENTS} from "../react-app-env.d";
import {CityResponse, EventResponse} from "../helpers/interfaces";

export default class ApiService {
    public getAllCities(){
        return axios.get<CityResponse[]>(`${API_ALL_CITIES}`);
    }
    public getAllEvents(){
        return axios.get<EventResponse[]>(`${API_ALL_EVENTS}`);
    }
}
