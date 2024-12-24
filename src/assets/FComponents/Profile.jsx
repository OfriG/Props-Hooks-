import { useState, useEffect } from 'react';
import EditDetails from './EditDetails';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [showEditDetails, setShowEditDetails] = useState(false);

    useEffect(() => {
        // Get the user from session storage
        const user = sessionStorage.getItem('currentUser');
        if (user) {
            const parsedUser = JSON.parse(user);
            console.log("Current User:", parsedUser);
            setCurrentUser(parsedUser);
        }
    }, []);

    const logoutUser = () => {
        // Remove user from session and local storage
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
        setCurrentUser(null);
        Swal.fire("Sign out successful");
        navigate('/Login');
    };

    //navigate to page -> edit details
    const editDetails = () => {
        navigate('/EditDetails', { state: { user: currentUser } });
    };
    
    //in case there is no loggin user
    if (!currentUser) {
        return <p>יש להתחבר למערכת</p>;
    }

    const divStyles = {
        margin: '20px auto',
        padding: '20px',
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

    const buttonContainer = {
        display: 'flex',
        justifyContent: 'center',
    };

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

    const linkStyles = {
        display: 'block',
        margin: '15px 0',
        padding: '10px',
        color: '#4a6fb9',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '16px',
    };

    return (
        <div style={divStyles}>
            <h3>Profile</h3>
            <p>שלום, {currentUser.userName}</p>
            <div style={formStyles}>
    <div>
        {currentUser.image ? (
            <img
                src={currentUser.image}
                alt="Profile"
                style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: '10px',
                }}
            />
        ) : (
            <p>אין תמונה זמינה</p>
        )}
    </div>
    {Object.entries(currentUser).map(([key, value]) => {
        if (key === 'image') return null; // Skip image field
        return (
            <p key={key}>
                <strong>{key}:</strong> {value || "לא הוזן"}
            </p>
        );
    })}
</div>
            <div style={buttonContainer}>
                <button style={buttonStyles} onClick={editDetails}>
                    עדכון פרטים
                </button>
                <a
                    style={linkStyles}
                    href="https://games.yo-yoo.co.il/games_play.php?game=4717"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    למשחק
                </a>
                <button style={buttonStyles} onClick={logoutUser}>
                    התנתק
                </button>
                {showEditDetails && <EditDetails />}
            </div>
        </div>
    );
}
