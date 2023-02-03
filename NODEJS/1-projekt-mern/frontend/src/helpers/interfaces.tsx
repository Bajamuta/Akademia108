export interface User {
    id: number,
    username: string,
    email: string,
    avatar_url: string,
    created_at: Date,
    updated_at?: Date
}

export interface DatabaseResponse {
    _id: string
}

export interface City{
    name: string
}

export interface CityResponse extends DatabaseResponse, City{}

export interface Event {
    name: string,
    date: Date,
    description: string
}

export interface EventResponse extends DatabaseResponse, Event {}

export interface CustomerRequest {
    firstname: string,
    surname: string,
    eventId: string,
    cityId: string
}

export interface CustomerResponse extends DatabaseResponse, CustomerRequest {}

export interface Customer extends CustomerResponse {
    event: Event,
    city: City
}

export interface InputValue {
    value: string,
    isValid: boolean,
    error: string
}

export interface FormDataLogin {
    username: string,
    password: string
}

export interface FormDataRegister{
    username: InputValue,
    password: InputValue,
    email: InputValue,
    passwordConfirm: InputValue
}

export interface LoginResponse {
    error?: boolean,
    id?: number,
    jwt_token: string,
    ttl?: number,
    username?: string
}

export interface ObjectContext {
    loggedUser: LoginResponse,
    setLoggedUser: (res: LoginResponse) => void
}
