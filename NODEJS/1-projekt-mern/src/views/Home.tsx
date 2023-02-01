import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {ObjectContext, User} from "../helpers/interfaces";
import './Home.css';
import {useOutletContext} from "react-router-dom";
import {REACT_APP_API_URL} from "../react-app-env.d";
export default function Home() {

    const objectContext: ObjectContext = useOutletContext();

    // how it works exactly?
    axios.defaults.headers.common['Authorization'] = "Bearer " + (objectContext.loggedUser.jwt_token.length > 0 ? objectContext.loggedUser.jwt_token : '');

    useEffect(() => {
    }, []);

    return (
        <div className="HomeContainer">
            {objectContext.loggedUser.jwt_token.length > 0 &&
                <div></div>
            }
            {objectContext.loggedUser.jwt_token.length > 0 &&
                <div></div>
            }
        </div>
    );
}
