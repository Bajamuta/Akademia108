import React, {useState} from 'react';
import './App.css';
import {Link, Outlet} from "react-router-dom";
import {LoginResponse} from "../helpers/interfaces";

function App() {
    const initLocal = localStorage.getItem("loggedUser") || '';
    const [loggedUser, setLoggedUser] = useState<LoginResponse>(initLocal.length > 0 ? JSON.parse( initLocal) : {jwt_token: ''});

  return (
    <div className="App">
      <header className="App-header">
          <h1>Events&apos; Registration Control</h1>
      </header>
        <nav className="AppNavbar">
            <ul>
                <li>
                    <Link to={"/"}>HOME</Link>
                </li>
                {loggedUser.jwt_token.length === 0 &&
                    <li>
                        <Link to={"/login"}>LOG IN</Link>
                    </li>
                }
                <li>
                    <Link to={"/register"}>REGISTER TO AN EVENT</Link>
                </li>
                {loggedUser.jwt_token.length === 0 &&
                    <li>
                        <Link to={"/signup"}>SIGN UP</Link>
                    </li>
                }
                {loggedUser.jwt_token.length > 0 &&
                    <li>
                        <Link to={"/signout"}>SIGN OUT</Link>
                    </li>
                }
            </ul>
        </nav>
        <Outlet context={{loggedUser, setLoggedUser}}/>
    </div>
  );
}

export default App;
