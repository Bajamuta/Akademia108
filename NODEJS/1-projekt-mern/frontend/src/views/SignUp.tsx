import React, {ChangeEvent} from "react";
import {FormDataRegister, LoginResponse, ObjectContext, UserResponse} from "../helpers/interfaces";
import {useNavigate, useOutletContext} from "react-router-dom";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import ApiService from "../services/ApiService";
import axios, {AxiosResponse} from "axios";
import {API_USER_CREATE} from "../react-app-env.d";

export default function SignUp() {

    const objectContext: ObjectContext = useOutletContext();
    const navigate = useNavigate();
    const apiService: ApiService = new ApiService();
    const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<FormDataRegister>();

    const onSubmit: SubmitHandler<FormDataRegister> = (data: FormDataRegister) => {
        console.log('inouts', data);
/*        axios.post(`${API_USER_CREATE}`, {
            username: data.username,
            password: data.password,
            email: data.email
        })*/
        apiService.registerUser(data)
            .then((response: AxiosResponse<UserResponse>) => {
            if (response.status === 200) {
                if (!response.data.error)
                {
                    navigate('/registered');
                }
               else
                {
                    console.error('An error has occurred during creating an user', response.data.error);
                }
            }
            else {
                console.log(response);
            }
        })
            .catch((error) => console.error("An error has occurred during registering an user:", error));
    }

    const passwordMatches = () => {
        return watch().password?.trim().length > 0
            && watch().password === watch().passwordConfirm;
    }

    return (<div className="FormContainer">
        <h2>Sign Up</h2>
        <Form name="signupForm" className="FormBody" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="my-3" controlId="username">
                <Form.Label>Username*:</Form.Label>
                <Controller control={control} name="username" defaultValue=""
                            render={({field: {onChange, onBlur, value, ref}}) => (
                    <Form.Control type="text" placeholder="Enter username"
                                  required
                                  minLength={3}
                                  onChange={onChange} value={value} ref={ref} isInvalid={!!errors.username}>
                    </Form.Control>
                )} />
                <Form.Control.Feedback type='invalid'>
                    {errors.username?.message}
                </Form.Control.Feedback>
                {errors.username && <Form.Text className="ValidationMessage">{errors.username?.message}</Form.Text>}
            </Form.Group>
            <Form.Group className="my-3" controlId="name">
                <Form.Label>Name*:</Form.Label>
                <Controller control={control} name="name" defaultValue=""
                            render={({field: {onChange, onBlur, value, ref}}) => (
                                <Form.Control type="text" placeholder="Enter name"
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
                <Form.Label>Name*:</Form.Label>
                <Controller control={control} name="surname" defaultValue=""
                            render={({field: {onChange, onBlur, value, ref}}) => (
                                <Form.Control type="text" placeholder="Enter surname"
                                              required
                                              minLength={3}
                                              onChange={onChange} value={value} ref={ref} isInvalid={!!errors.surname}>
                                </Form.Control>
                            )} />
                <Form.Control.Feedback type='invalid'>
                    {errors.surname?.message}
                </Form.Control.Feedback>
                {errors.surname && <Form.Text className="ValidationMessage">{errors.surname?.message}</Form.Text>}
            </Form.Group>
            <Form.Group className="my-3" controlId="email">
                <Form.Label>Email*:</Form.Label>
                <Controller control={control} name="email" defaultValue=""
                            render={({field: {onChange, onBlur, value, ref}}) => (
                                <Form.Control type="email" placeholder="Enter email"
                                              required
                                              className={errors.email ? 'invalid' : 'valid'}
                                              onChange={onChange} value={value} ref={ref} isInvalid={!!errors.email}>
                                </Form.Control>
                            )} />
                {/*<Form.Control type="email" placeholder="Enter email"
                              {...register("email", { required: true, pattern: /^\/w+@\/w+.\/w{2}$/ })}>
                </Form.Control>*/}
                {errors.email && <Form.Text className="ValidationMessage">{errors.email?.message}</Form.Text>}
            </Form.Group>
            <Form.Group className="my-3" controlId="password">
                <Form.Label>Password*:</Form.Label>
                <Controller control={control} name="password" defaultValue=""
                            render={({field: {onChange, onBlur, value, ref}}) => (
                                <Form.Control type="password" placeholder="Enter password"
                                              className={errors.password ? 'invalid' : 'valid'}
                                              required
                                              pattern="^[\w\d]+$"
                                              onChange={onChange}
                                              value={value} ref={ref}
                                              isInvalid={!!errors.password}>
                                </Form.Control>
                            )} />
                {/*<Form.Control type="password" placeholder="Enter password"
                              {...register("password", { required: true, pattern: /^\/w+$/ })}>
                </Form.Control>*/}
                {errors.password && <Form.Text className="ValidationMessage">{errors.password?.message}</Form.Text>}
            </Form.Group>
            <Form.Group className="my-3" controlId="passwordConfirm">
                <Form.Label>Confirm password*:</Form.Label>
                <Controller control={control} name="passwordConfirm" defaultValue=""
                            render={({field: {onChange, onBlur, value, ref}}) => (
                                <Form.Control type="password" placeholder="Confirm password"
                                              required
                                              pattern="^[\w\d]+$"
                                              onChange={onChange} value={value} ref={ref}
                                              isInvalid={!!errors.passwordConfirm || !passwordMatches()}
                                >
                                </Form.Control>
                            )} />
                {/*<Form.Control type="password" placeholder="Confirm password"
                              {...register("passwordConfirm", { required: true, pattern: /^\/w+$/ })}>
                </Form.Control>*/}
                {errors.passwordConfirm && <Form.Text className="ValidationMessage">{errors.passwordConfirm?.message}</Form.Text>}
            </Form.Group>
            <Button variant="primary"
                    size="lg"

                    type="submit">Sign Up</Button>
        </Form>
    </div>);
}
