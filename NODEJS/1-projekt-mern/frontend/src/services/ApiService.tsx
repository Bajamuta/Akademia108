import axios from "axios";
import {
    API_ALL_CITIES,
    API_ALL_EVENTS,
    API_REGISTRATION_CREATE, API_REGISTRATION_DELETE,
    API_USER_CREATE, API_USER_DELETE, API_USER_UPDATE,
    API_USER_URL
} from "../react-app-env.d";
import {
    CityResponse,
    RegistrationRequest,
    EventResponse,
    FormDataRegister,
    UserResponse, UnregistrationRequest
} from "../helpers/interfaces";

export default class ApiService {
    public getAllCities(){
        return axios.get<CityResponse[]>(`${API_ALL_CITIES}`);
    }
    public getAllEvents(){
        return axios.get<EventResponse[]>(`${API_ALL_EVENTS}`);
    }
    public registerForEvent(data: RegistrationRequest){
        return axios.post<Response>(`${API_REGISTRATION_CREATE}`, data);
    }
    public unregisterFromAnEvent(userId: string, registrationId: string){
        const data = {userId: userId, registrationId: registrationId} as UnregistrationRequest;
        return axios.post<Response>(`${API_REGISTRATION_DELETE}`, data);
    }
    public registerUser(data: FormDataRegister){
        return axios.post<UserResponse>(`${API_USER_CREATE}`, data);
    }
    public getUserDetails(id: string){
        return axios.get<UserResponse>(`${API_USER_URL}/${id}`);
    }
    public updateUser(id: string, data: FormDataRegister){
        return axios.post<UserResponse>(`${API_USER_UPDATE}/${id}`, data);
    }
    public deleteUser(id: string){
        return axios.delete<Response>(`${API_USER_DELETE}/${id}`);
    }
}
