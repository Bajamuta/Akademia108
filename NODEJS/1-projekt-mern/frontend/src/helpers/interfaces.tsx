export interface DatabaseResponse {
    _id: string,
    error?: string
}

export interface User {
    username: string,
    email: string,
    avatarUrl: string,
    createdAt: Date,
    updatedAt?: Date
}

export interface UserResponse extends DatabaseResponse, User{
}

export interface UserDetailsRequest {
    username: string,
    _id: string
}

export interface City{
    name: string
}

export interface CityResponse extends DatabaseResponse, City{}

export interface Event {
    name: string,
    date: string,
    description: string
}

export interface EventResponse extends DatabaseResponse, Event {}

export interface CustomerRequest {
    name: string,
    surname: string,
    eventId: string,
    cityId: string
}

export interface CustomerResponse extends DatabaseResponse, CustomerRequest {}

export interface Customer extends CustomerResponse {
    event: Event,
    city: City
}

export interface FormDataLogin {
    username: string,
    password: string
}

export interface FormDataRegister{
    username: string,
    password: string,
    email: string,
    passwordConfirm: string
}

export interface LoginResponse {
    error?: Error,
    id?: string,
    jwt_token?: string,
    ttl?: string,
    username?: string
}

export interface ObjectContext {
    loggedUser: LoginResponse,
    setLoggedUser: (res: LoginResponse) => void
}

export interface Error {
    message: string
}
