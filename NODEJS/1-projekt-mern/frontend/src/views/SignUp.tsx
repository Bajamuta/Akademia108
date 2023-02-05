import React, {ChangeEvent} from "react";
import {FormDataRegister, ObjectContext} from "../helpers/interfaces";
import {useNavigate, useOutletContext} from "react-router-dom";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";

export default function SignUp() {

    const objectContext: ObjectContext = useOutletContext();
    const navigate = useNavigate();

    const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<FormDataRegister>();

    const onSubmit: SubmitHandler<FormDataRegister> = (data: FormDataRegister) => {
        console.log('inouts', data);
        /*axios.post(`${API_URL}/user/signup`, {
            username: data.username,
            password: data.password,
            email: data.email
        }).then((response: AxiosResponse<any>) => {
            if (response.status === 200) {
                navigate('/registered');
            }
            else {
                console.log(response);
            }
        })
            .catch((error) => console.error("An error has occurred during registering an user:", error));*/
    }
    const test = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('test', e.target);
        // register("username", { required: true, minLength: 3 });
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
                                              pattern="^\w+\d$"
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
                                              pattern="^\w+\d$"
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
