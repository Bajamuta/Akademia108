import React, {useEffect} from "react";
import {ObjectContext} from "../helpers/interfaces";
import {useOutletContext} from "react-router-dom";
import "./LogOut.css";

export default function LogOut() {

    const objectContext: ObjectContext = useOutletContext();

    useEffect(() => {
        localStorage.removeItem("loggedUser");
        objectContext.setLoggedUser({jwt_token: "", username: "", ttl: "", id: "", error: ""});
    }, []);

    return (<div className="Container">
        <h2>Log Out</h2>
        <p>You have been successfully logged out.</p>
    </div>);
}
