/// <reference types="react-scripts" />
export const API_URL = "http://localhost:8080/api";

/*
* CITIES
* */
export const API_CITY_URL = `${API_URL}/city`;
export const API_ALL_CITIES = `${API_CITY_URL}/all`;
export const API_CITY_CREATE = `${API_CITY_URL}/add`;
export const API_CITY_UPDATE = `${API_CITY_URL}/update`;
export const API_CITY_DELETE = `${API_CITY_URL}/delete`;

/*
* EVENTS
* */
export const API_EVENT_URL = `${API_URL}/event`;
export const API_ALL_EVENTS = `${API_EVENT_URL}/all`;
export const API_EVENT_CREATE = `${API_EVENT_URL}/add`;
export const API_EVENT_UPDATE = `${API_EVENT_URL}/update`;
export const API_EVENT_DELETE = `${API_EVENT_URL}/delete`;

/*
* CUSTOMERS
* */
export const API_CUSTOMER_URL = `${API_URL}/customer`;
export const API_ALL_CUSTOMERS = `${API_CUSTOMER_URL}/all`;
export const API_CUSTOMERS_BY_EVENT = `${API_CUSTOMER_URL}/event`;
export const API_CUSTOMERS_BY_CITY = `${API_CUSTOMER_URL}/city`;
export const API_CUSTOMER_CREATE = `${API_CUSTOMER_URL}/add`;
export const API_CUSTOMER_UPDATE = `${API_CUSTOMER_URL}/update`;
export const API_CUSTOMER_DELETE = `${API_CUSTOMER_URL}/delete`;

/*
* USERS
* */
export const API_USER_URL = `${API_URL}/user`;
export const API_ALL_USERS = `${API_USER_URL}/all`;
export const API_USER_CREATE = `${API_USER_URL}/add`;
export const API_USER_UPDATE = `${API_USER_URL}/update`;
export const API_USER_DELETE = `${API_USER_URL}/delete`;

/*show users for that specified event, for all cities*/
export const API_USERS_EVENT = `${API_USER_URL}/event`;
/*show users for all events but in specified city*/
export const  API_USERS_CITY = `${API_USER_URL}/city`;


export const API_REGISTRATION_CREATE = `${API_URL}/registration/add`;

/*
* AUTH
* */
export const AUTH_TOKEN = `http://localhost:8080/auth/login`;
