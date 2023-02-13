export interface DatabaseResponse {
    _id: string,
    error?: string
}

export interface User {
    name: string,
    surname: string,
    username: string,
    email: string,
    avatarUrl: string,
    createdAt: Date,
    registrations: RegistrationResponse[],
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

export interface Registration {
    event: Event,
    city: City,
    user: User
}

export interface RegistrationResponse extends DatabaseResponse, Registration {}

export interface EventResponse extends DatabaseResponse, Event {}

export interface RegistrationRequest {
    userId: string,
    eventId: string,
    cityId: string
}

export interface FormDataLogin {
    username: string,
    password: string
}

export interface FormDataRegister{
    username: string,
    name: string,
    surname: string,
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

export interface Response {
    result: string
}
