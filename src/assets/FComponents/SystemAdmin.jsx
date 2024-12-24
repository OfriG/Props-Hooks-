import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function SystemAdmin() {
    const [usersList, setUserList] = useState([]);
    const navigate = useNavigate();

    // Load users from localStorage
    useEffect(() => {
        const storedUsers = localStorage.getItem('usersList');
        if (storedUsers) {
            setUserList(JSON.parse(storedUsers));
        }
    }, []);

    console.log('usersList', usersList);

    //navigate to edit details
    const editUserDetails = (user) => {
        navigate('/EditDetails', { state: { user } });
    };
    
    //delete user
    const deleteUser = (userToDelete) => {
        const updatedUsers = usersList.filter(user => user.userName !== userToDelete.userName);
        setUserList(updatedUsers);
        localStorage.setItem('usersList', JSON.stringify(updatedUsers));
        Swal.fire(`${userToDelete.userName} נמחק`);

    };
    const divStyles = {
        margin: '20px auto',
        paddingBottom: '10px',
        borderRadius: '10px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'white',
        fontSize: '22px',

    };
    const formStyles = {
        margin: '20px auto',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'left',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#4a6fb9',
        fontSize: '22px',

    };
    const buttonContainer={
        display: 'flex',
        justifyContent: 'center', 
    }
    
    const buttonStyles = {
        display: 'flex',
        margin: '10px 5px',
        padding: '10px 20px',
        backgroundColor: '#4a6fb9',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    };
    

    return (
        <div style={divStyles}>
            <h3>SystemAdmin</h3>
            <div style={formStyles}>
                {usersList.length > 0 ? (
                    usersList.map((user, index) => (
                        <div
                            key={index}
                            style={{
                                marginBottom: '10px',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                backgroundColor: '#f9f9f9',    whiteSpace: 'nowrap',
                                overflowX: 'auto'
                            }}
                        >
                            {Object.entries(user).map(([key, value]) => (
                                <p key={key}>
                                    <strong>{key}: </strong>
                                    {value}
                                </p>
                            ))}
                            <div style={buttonContainer}>
                                <button style={buttonStyles} onClick={() => editUserDetails(user)}>
                                    עדכון פרטי משתמש
                                </button>
                                <br />
                                <button style={buttonStyles} onClick={() => deleteUser(user)}>
                                    מחיקת משתמש
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>אין משתמשים להצגה</p>
                )}
            </div>
        </div>
    );}