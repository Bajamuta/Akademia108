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

    const refreshView = () => {
        setShowEdit(false);
        getUserDetails().then((userDetails) => setUserDetails(userDetails));
    }

    return (
        <div className="HomeContainer">
            <div className="d-flex justify-content-between">
                <img className="UserAvatar w-50" src={userDetails.avatarUrl || defaultAvatarUrl} alt="user's avatar" />
                <div className="w-50">
                    <p><span className="fw-bold">Username:</span> {userDetails.username}</p>
                    <p><span className="fw-bold">Email:</span> {userDetails.email}</p>
                    <p><span className="fw-bold">Name:</span> {userDetails.name}</p>
                    <p><span className="fw-bold">Surname:</span> {userDetails.surname}</p>
                    <div className="d-flex flex-column">
                        <Button type="button" className="w-50 mb-4" variant="info" onClick={() => setShowEdit(true)}>Edit details</Button>
                        <Button type="button" className="w-50" variant="danger" onClick={deleteUser}>Delete account</Button>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <div className="w-50">
                    <h3 className="mt-4">Events:</h3>
                    {!userDetails?.registrations.length && <p>No events.</p>}
                    {!!userDetails?.registrations.length && <ul className="pe-5">
                        {userDetails.registrations.map(
                            (registration) => {
                                return (<li key={registration._id} className="mb-4">
                                    {registration.event.name}<br/>{registration.event.description}<br/>{datePipe(registration.event.date)}
                                    <br/>
                                    <Button type="button" className="mt-3" variant="danger" onClick={() => unregisterFromAnEvent(registration._id)}>Unregister</Button>
                                </li>);
                            }
                        )}
                    </ul>}
                </div>
                <div className="w-50">
                    {showEdit && <EditProfile userDetails={userDetails} cancel={() => setShowEdit(false)} refreshView={refreshView}/>}
                </div>
            </div>
        </div>
    );
}
