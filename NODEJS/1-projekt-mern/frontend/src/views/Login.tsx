import React, {FormEvent, useState} from "react";
import './Login.css';
import {FormDataLogin, ObjectContext, LoginResponse} from "../helpers/interfaces";
import axios, {AxiosResponse} from "axios";
import {useNavigate, useOutletContext} from "react-router-dom";
import {API_URL, AUTH_TOKEN} from "../react-app-env.d";

export default function Login() {

    const objectContext: ObjectContext = useOutletContext();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>("Incorrect username or password");

    const [formData, setFormData] = useState<FormDataLogin>({
        username: "",
        password: ""
    });
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post(`${AUTH_TOKEN}`, {
            username: formData.username,
            password: formData.password
        }).then((response: AxiosResponse<LoginResponse>) => {
            if (response.status === 200) {
                if (!response.data.error)
                {
                    setShowErrorMessage(false);
                    localStorage.setItem("loggedUser", JSON.stringify(response.data));
                    objectContext.setLoggedUser(response.data);
                    navigate('/');
                }
                else
                {
                    console.error('An error has occurred during retrieving login token', response.data.error);
                    // setErrorMessage(response.data.error)
                    setShowErrorMessage(true);
                }
            }
            else {
                setShowErrorMessage(true);
            }
        })
            .catch((error) => console.error("An error has occurred during logging in:", error));
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const name = target.name;
        setFormData({
            ...formData,
            [name]: target.value
        });
        setShowErrorMessage(false);
    }
    return (<div className="FormContainer">
        <h2>Log In</h2>
        <form className="FormBody" onSubmit={handleSubmit}>
            <label form={formData.username}>Username*:</label>
            <input type="text"
                   name="username"
                   placeholder="Enter username"
                   onChange={handleInputChange}/>
            <label form={formData.password}>Password*:</label>
            <input type="password" placeholder="Enter password"
                   name="password" onChange={handleInputChange}/>
            <button type="submit" className="Button PrimaryButton">Login</button>
        </form>
        {showErrorMessage && <p className="FontItalic FontRed">{errorMessage}</p>}
    </div>);
}
