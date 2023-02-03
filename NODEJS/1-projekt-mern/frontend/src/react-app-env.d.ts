/// <reference types="react-scripts" />
export const API_URL = "http://0.0.0.0:8080/api";

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
