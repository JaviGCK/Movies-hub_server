import './header.css';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from 'react';

export const Header = () => {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
    const [showGoodbyeMessage, setShowGoodbyeMessage] = useState(false);

    const handleAuthClick = () => {
        if (isAuthenticated) {
            setShowGoodbyeMessage(true);
            setTimeout(() => {
                setShowGoodbyeMessage(false);
                logout();
            }, 5000);
        } else {
            loginWithRedirect();
        }
    };

    useEffect(() => {
        if (isAuthenticated && user) {
            user.nickname || user.email;
            setShowWelcomeMessage(true);

            setTimeout(() => {
                setShowWelcomeMessage(false);
            }, 5000);
        }
    }, [isAuthenticated, user]);

    return (
        <header className='header'>
            <h1 className="title-header">Movies<span> </span><span className="title-span">H</span>ub</h1>
            <span className='title-separate'></span>
            <button onClick={handleAuthClick} className="login-icon-button">
                {isAuthenticated ? <BiLogOut className='login-icon' /> : <BiLogIn className='login-icon' />}
            </button>
            {showWelcomeMessage && (
                <div className="log-message">
                    Welcome, {user?.nickname || user?.email}!
                </div>
            )}
            {showGoodbyeMessage && (
                <div className="log-message">
                    See you soon, {user?.nickname || user?.email}!
                </div>
            )}
        </header>
    );
};


