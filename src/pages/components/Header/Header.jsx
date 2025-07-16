import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header({user, onLogin, onLogout}) {
    return (
        <header className="app-header">
            <div className="logo">
                <Link to="/">🏠 Home</Link>
            </div>
            <div className="auth">
                {user 
                    ? <>
                        <span>Привет, {user.name}</span>
                         <button onClick={onLogout}>Logout</button>
                    </>
                : <>
                <button onClick={onLogin}>Login</button>
                <button onClick={onLogin}>Register</button>
                </>
                }   
            </div>
        </header>
    );
}