import React, {useEffect, useState} from "react";
import {ObjectContext, UserResponse} from "../helpers/interfaces";
import {useOutletContext} from "react-router-dom";
import ApiService from "../services/ApiService";
import axios, {AxiosResponse} from "axios";
import {Button} from "react-bootstrap";

export default function User() {
    const objectContext: ObjectContext = useOutletContext();
    const apiService: ApiService = new ApiService();
    const defaultAvatarUrl = 'https://images.unsplash.com/photo-1622227056993-6e7f88420855?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80';
    const [userDetails, setUserDetails] = useState<UserResponse>();

    axios.defaults.headers.common['Authorization'] = "Bearer " + (objectContext.loggedUser.jwt_token || '');

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = () => {
        apiService.getUserDetails(objectContext.loggedUser.id!)
            .then(
                (response: AxiosResponse<UserResponse>) => {
                    if (!response.data.error)
                    {
                        setUserDetails(response.data);
                        console.log('tu', response.data);
                    }
                    else
                    {
                        console.error('An error has occurred during retrieving logged user\'s details', response.data.error);
                    }
                }
            )
    }

    return (
        <div className="HomeContainer">
            <img className="UserAvatar" src={userDetails?.avatarUrl || defaultAvatarUrl} />
            <p>Username: {userDetails?.username}</p>
            <p>Email: {userDetails?.email}</p>
            <Button type="button">Edit</Button>
        </div>
    );
}
