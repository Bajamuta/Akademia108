import axios from "axios";
import {API_ALL_CITIES, API_ALL_EVENTS, API_CUSTOMER_CREATE, API_USER_CREATE, API_USER_URL} from "../react-app-env.d";
import {
    CityResponse,
    CustomerRequest,
    CustomerResponse,
    EventResponse,
    FormDataRegister, UserDetailsRequest,
    UserResponse
} from "../helpers/interfaces";

export default class ApiService {
    public getAllCities(){
        return axios.get<CityResponse[]>(`${API_ALL_CITIES}`);
    }
    public getAllEvents(){
        return axios.get<EventResponse[]>(`${API_ALL_EVENTS}`);
    }
    public registerCustomer(data: CustomerRequest){
        return axios.post<CustomerResponse>(`${API_CUSTOMER_CREATE}`, data);
    }
    public registerUser(data: FormDataRegister){
        return axios.post<UserResponse>(`${API_USER_CREATE}`, data);
    }

    public getUserDetails(id: string){
        return axios.get<UserResponse>(`${API_USER_URL}/${id}`);
    }
}
