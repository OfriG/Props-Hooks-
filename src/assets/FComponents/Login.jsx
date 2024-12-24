import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Login({ onLogin }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [usersList, setUserList] = useState([]);

    const defaultUser = { userName: 'admin', password: 'ad12343211ad' };

    useEffect(() => {
        const savedUsers = localStorage.getItem('usersList');
        let users = savedUsers ? JSON.parse(savedUsers) : [];

        const adminExists = users.some(user => user.userName === defaultUser.userName);
        if (!adminExists) {
            users.push(defaultUser);
        }

        localStorage.setItem('usersList', JSON.stringify(users));
        setUserList(users);
    }, []);

    //login in case there is match user & password
    const btnLogIn = () => {
        const userExists = usersList.find(
            user => user.userName === userName && user.password === password
        );

        if (userExists) {
            sessionStorage.setItem('currentUser', JSON.stringify(userExists));
            onLogin(userName, password); // Update App with login info
            Swal.fire({
                title: "Success!",
                text: "Login successful",
            });
            setUserName('');
            setPassword('');
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "User does not exist or credentials are incorrect.",
            });
        }
    };

    const formStyles = {
        maxWidth: '70%',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#ddd',
        color: 'black',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const inputStyles = {
        width: '100%',
        padding: '10px',
        margin: '8px 0',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '1rem',
        boxSizing: 'border-box',
    };

    const divStyles = {
        margin: '20px auto',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'white',
        fontSize: '22px',
    };

    return (
        <div style={divStyles}>
            <h3>Login</h3>
            <div style={formStyles}>
                <p>Username:</p>
                <input
                    style={inputStyles}
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <p>Password:</p>
                <input
                    style={inputStyles}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={btnLogIn}>Login</button>
            </div>
        </div>
    );
}
