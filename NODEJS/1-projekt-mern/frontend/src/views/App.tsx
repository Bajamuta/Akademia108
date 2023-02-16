import React, {useState} from 'react';
import './App.css';
import {Link, Outlet} from "react-router-dom";
import {LoginResponse} from "../helpers/interfaces";
import Footer from "./Footer";
import Header from "./Header";

function App() {
    const initLocal = localStorage.getItem("loggedUser") || '';
    const [loggedUser, setLoggedUser] = useState<LoginResponse>(initLocal.length > 0 ? JSON.parse( initLocal) : {jwt_token: ''});

  return (
    <div className="App">
        <Header/>
        <nav className="AppNavbar">
            <ul>
                <li>
                    <Link to={"/"}>HOME</Link>
                </li>
                {!!loggedUser?.jwt_token &&
                    <li>
                        <Link to={"/register"}>REGISTER TO AN EVENT</Link>
                    </li>}
                {!loggedUser?.jwt_token &&
                    <li>
                        <Link to={"/login"}>LOG IN</Link>
                    </li>
                }
                {!loggedUser?.jwt_token &&
                    <li>
                        <Link to={"/signup"}>SIGN UP</Link>
                    </li>
                }
                {!!loggedUser?.jwt_token &&
                    <li>
                        <Link to={"/logout"}>LOG OUT</Link>
                    </li>
                }
                {!!loggedUser?.jwt_token &&
                    <li>
                        <Link to={"/user"}>USER</Link>
                    </li>
                }
            </ul>
        </nav>
        <Outlet context={{loggedUser, setLoggedUser}}/>
        <Footer/>
    </div>
  );
}

export default App;
