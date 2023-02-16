import React, {useEffect, useState} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import axios, {AxiosResponse} from "axios";
import ApiService from "../services/ApiService";
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import {CityResponse, RegistrationRequest, EventResponse, ObjectContext} from "../helpers/interfaces";

export default function Register() {
    const objectContext: ObjectContext = useOutletContext();
    const navigate = useNavigate();
    const apiService: ApiService = new ApiService();
    const [cities, setCities] = useState<CityResponse[]>([]);
    const [events, setEvents] = useState<EventResponse[]>([]);
    const { register, handleSubmit, watch, control, reset, formState: { errors } } = useForm<RegistrationRequest>();

    const onSubmit: SubmitHandler<RegistrationRequest> = (data: RegistrationRequest) => {
        apiService.registerForEvent({...data, userId: objectContext.loggedUser.id as string})
            .then((response: AxiosResponse<Response>) => {
            if (response.status === 200) {
                navigate('/thankyou');
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
        <div className="Container BorderContainer mb-5">
            <h2>Register for an event</h2>
            <Form name="customerForm" className="FormBody" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="" controlId="eventId">
                    <Form.Label>Event*:</Form.Label>
                    <Controller control={control} name="eventId" defaultValue=""
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <Form.Select aria-label="Select an event"
                                                  required
                                                  onChange={onChange} value={value} ref={ref} isInvalid={!!errors.eventId}>
                                        <option value="" disabled>Select an event from the list</option>
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
                                    </Form.Select>
                                )} />
                    {errors.eventId && <Form.Text className="ValidationMessage">{errors.eventId?.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="" controlId="cityId">
                    <Form.Label>City*:</Form.Label>
                    <Controller control={control} name="cityId" defaultValue=""
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <Form.Select aria-label="Select a city"
                                                 required
                                                 onChange={onChange} value={value} ref={ref} isInvalid={!!errors.cityId}>
                                        <option value="" disabled>Select a city from the list</option>
                                        {
                                            cities?.map(
                                                (city: CityResponse) => {
                                                    return (
                                                        <option key={city._id} value={city._id}>
                                                            {city.name}
                                                        </option>
                                                    );
                                                }
                                            )
                                        }
                                    </Form.Select>
                                )} />
                    {errors.cityId && <Form.Text className="ValidationMessage">{errors.cityId?.message}</Form.Text>}
                </Form.Group>
                <Button variant="primary" size="lg" type="submit" className="mt-4">Register</Button>
            </Form>
        </div>
    );
}
