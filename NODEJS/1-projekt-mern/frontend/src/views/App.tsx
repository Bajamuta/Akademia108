import React, {useState} from 'react';
import './App.css';
import {Link, Outlet} from "react-router-dom";
import {LoginResponse} from "../helpers/interfaces";

function App() {
    /*TODO sprawdzić co zwraca auth token -> zalogowany tylko gdy loggedUser ma token, inaczej nie ustawiaj localstorage!*/
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
                <li>
                    <Link to={"/register"}>REGISTER TO AN EVENT</Link>
                </li>
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
            </ul>
        </nav>
        <Outlet context={{loggedUser, setLoggedUser}}/>
    </div>
  );
}

export default App;
