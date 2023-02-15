import React, {useEffect, useState} from "react";
import {EventResponse, ObjectContext, RegistrationResponse, UserDetails, UserResponse} from "../helpers/interfaces";
import {useNavigate, useOutletContext} from "react-router-dom";
import ApiService from "../services/ApiService";
import axios, {AxiosResponse} from "axios";
import {Button} from "react-bootstrap";
import {datePipe} from "../helpers/dateHelper";
import EditProfile from "./EditProfile";

export default function User() {
    const objectContext: ObjectContext = useOutletContext();
    const apiService: ApiService = new ApiService();
    const navigate = useNavigate();
    const defaultAvatarUrl = 'https://images.unsplash.com/photo-1622227056993-6e7f88420855?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80';
    const [userDetails, setUserDetails] = useState<UserResponse>({
        _id: '',
        name: '',
        surname: '',
        username: '',
        email: '',
        avatarUrl: '',
        createdAt: new Date(),
        registrations: [],
    });
    const [showEdit, setShowEdit] = useState<boolean>(false);

    axios.defaults.headers.common['Authorization'] = "Bearer " + (objectContext.loggedUser.jwt_token || '');

    useEffect(() => {
        getUserDetails()
            .then((userDetails) => setUserDetails(userDetails));
    }, []);

    const getUserDetails = (): Promise<UserResponse> => {
        return apiService.getUserDetails(objectContext.loggedUser.id)
            .then(
                (response: AxiosResponse<UserResponse>) => {
                    if (!response.data.error) {
                        return Promise.resolve(response.data);
                    } else {
                        console.error('An error has occurred during retrieving logged user\'s details', response.data.error);
                        return Promise.reject();
                    }
                }
            );
    }

    const deleteUser = () => {
        return apiService.deleteUser(userDetails._id).then(
            (result: AxiosResponse<Response>) => {
                if (result.status === 200 || result.status === 204)
                {
                    navigate('/logout');
                }
            }
        )
    }

    const unregisterFromAnEvent = (registrationId: string) => {
        return apiService.unregisterFromAnEvent(userDetails._id, registrationId)
            .then(
                (result) => {
                    console.log('tu', result);
                    if (result.status === 200 || result.status === 204)
                    {
                        return getUserDetails()
                    }
                }
            )
            .then(
                (userDetails) => {
                    if (userDetails)
                    {
                        setUserDetails(userDetails)
                    }
                    else
                    {
                        navigate('/');
                    }
                }
            )
    }

    return (
        <div className="HomeContainer">
            <img className="UserAvatar" src={userDetails.avatarUrl || defaultAvatarUrl} alt="user's avatar" />
            <p>Username: {userDetails.username}</p>
            <p>Email: {userDetails.email}</p>
            <p>Name: {userDetails.name}</p>
            <p>Surname: {userDetails.surname}</p>
            <h3>Events:</h3>
            {!userDetails?.registrations.length && <p>No events.</p>}
            {!!userDetails?.registrations.length && <ul>
                {userDetails.registrations.map(
                    (registration) => {
                        return (<li key={registration._id}>
                            {registration.event.name} {registration.event.description} {datePipe(registration.event.date)}
                            <Button type="button" variant="danger" onClick={() => unregisterFromAnEvent(registration._id)}>Unregister</Button>
                        </li>);
                    }
                )}
            </ul>}
            <Button type="button" variant="info" onClick={() => setShowEdit(true)}>Edit details</Button>
            <Button type="button" variant="danger" onClick={deleteUser}>Delete account</Button>
            {showEdit && <EditProfile userDetails={userDetails} cancel={() => setShowEdit(false)}/>}
        </div>
    );
}
