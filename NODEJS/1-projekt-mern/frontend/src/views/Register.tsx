import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import axios, {AxiosResponse} from "axios";
import ApiService from "../services/ApiService";
import {CityResponse, CustomerRequest, CustomerResponse, EventResponse} from "../helpers/interfaces";

export default function Register() {
    const apiService: ApiService = new ApiService();
    const [cities, setCities] = useState<CityResponse[]>([]);
    const [events, setEvents] = useState<EventResponse[]>([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<CustomerRequest>();

    const onSubmit: SubmitHandler<CustomerRequest> = (data: CustomerRequest) => {
        apiService.registerCustomer(data).then((response: AxiosResponse<CustomerResponse>) => {
            if (response.status === 200) {
                // navigate('/registered');

            }
            else {
                console.log(response);
            }
        })
            .catch((error) => console.error("An error has occurred during registering for an event:", error));
    }

    useEffect(() => {
        apiService.getAllEvents()
            .then(
                (result: AxiosResponse<EventResponse[]>) => setEvents(result.data)
            )
            .catch((error) => console.error('An error has occurred during retrieving data (events)', error));
        apiService.getAllCities()
            .then(
                (result: AxiosResponse<CityResponse[]>) => setCities(result.data)
            )
            .catch((error) => console.error('An error has occurred during retrieving data (cities)', error));
    }, []);

    return (
        <div className="FormContainer">
            <h2>Register for an event</h2>
            <form name="customerForm" className="FormBody" onSubmit={handleSubmit(onSubmit)}>
                <label>First name*:</label>
                <input type="text" placeholder="Enter first name"
                       {...register("firstname", {required: true, minLength: 3})}/>
                {errors.firstname && <span className="ValidationMessage">{errors.firstname?.message}</span>}
                <label>Surname*:</label>
                <input type="text" placeholder="Enter surname"
                       {...register("surname", {required: true, minLength: 4})}/>
                {errors.surname && <span className="ValidationMessage">{errors.surname?.message}</span>}
                <label>Event*:</label>
                <select>
                    {
                        events?.map(
                            (event: EventResponse) => {
                                return (
                                    <option key={event._id} value={event._id}>
                                        {event.name} ({event.date}): {event.description}
                                    </option>
                                );
                            }
                        )
                    }
                </select>
            </form>
        </div>
    );
}
