import React, {useEffect, useState} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import axios, {AxiosResponse} from "axios";
import ApiService from "../services/ApiService";
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import {CityResponse, CustomerRequest, CustomerResponse, EventResponse, ObjectContext} from "../helpers/interfaces";

export default function Register() {
    const objectContext: ObjectContext = useOutletContext();
    const navigate = useNavigate();
    const apiService: ApiService = new ApiService();
    const [cities, setCities] = useState<CityResponse[]>([]);
    const [events, setEvents] = useState<EventResponse[]>([]);
    const { register, handleSubmit, watch, control, reset, formState: { errors } } = useForm<CustomerRequest>();

    const onSubmit: SubmitHandler<CustomerRequest> = (data: CustomerRequest) => {
        apiService.registerCustomer(data)
            .then((response: AxiosResponse<CustomerResponse>) => {
            if (response.status === 200) {
                navigate('/thankyou');
                console.log('resp', response);
                //TODO how to handle errors from database?
                // if (!response.error)
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
            <Form name="customerForm" className="FormBody" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="my-3" controlId="name">
                    <Form.Label>First name*:</Form.Label>
                    <Controller control={control} name="name" defaultValue=""
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <Form.Control type="text" placeholder="Enter first name"
                                                  required
                                                  minLength={3}
                                                  onChange={onChange} value={value} ref={ref} isInvalid={!!errors.name}>
                                    </Form.Control>
                                )} />
                    <Form.Control.Feedback type='invalid'>
                        {errors.name?.message}
                    </Form.Control.Feedback>
                    {errors.name && <Form.Text className="ValidationMessage">{errors.name?.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="my-3" controlId="surname">
                    <Form.Label>Surname*:</Form.Label>
                    <Controller control={control} name="surname" defaultValue=""
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <Form.Control type="text" placeholder="Enter surname"
                                                  required
                                                  minLength={4}
                                                  onChange={onChange} value={value} ref={ref} isInvalid={!!errors.surname}>
                                    </Form.Control>
                                )} />
                    <Form.Control.Feedback type='invalid'>
                        {errors.surname?.message}
                    </Form.Control.Feedback>
                    {errors.surname && <Form.Text className="ValidationMessage">{errors.surname?.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="my-3" controlId="eventId">
                    <Form.Label>Event*:</Form.Label>
                    <Controller control={control} name="eventId" defaultValue=""
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <Form.Select aria-label="Select an event"
                                                  required
                                                  onChange={onChange} value={value} ref={ref} isInvalid={!!errors.eventId}>
                                        <option>Select an event from the list</option>
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
                    <Form.Control.Feedback type='invalid'>
                        {errors.eventId?.message}
                    </Form.Control.Feedback>
                    {errors.eventId && <Form.Text className="ValidationMessage">{errors.eventId?.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="my-3" controlId="cityId">
                    <Form.Label>City*:</Form.Label>
                    <Controller control={control} name="cityId" defaultValue=""
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <Form.Select aria-label="Select a city"
                                                 required
                                                 onChange={onChange} value={value} ref={ref} isInvalid={!!errors.eventId}>
                                        <option>Select a city from the list</option>
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
                    <Form.Control.Feedback type='invalid'>
                        {errors.cityId?.message}
                    </Form.Control.Feedback>
                    {errors.cityId && <Form.Text className="ValidationMessage">{errors.cityId?.message}</Form.Text>}
                </Form.Group>
                <Button variant="primary"
                        size="lg"
                        type="submit">Register</Button>
            </Form>
        </div>
    );
}
