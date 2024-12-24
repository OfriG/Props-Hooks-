import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import validateUser from './validation'; 
import Swal from 'sweetalert2';

export default function EditDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const [editedUser, setEditedUser] = useState(location.state?.user || {});
    const [filteredCities, setFilteredCities] = useState([]);
    const citiesList = [
        "Afula", "BeerSheva", "Caesarea", "Dimona", "Eilat",
        "Fureidis", "Giv'atayim", "Hadera", "Haifa", "Jerusalem",
        "Karmiel", "Lod", "Ma'alot-Tarshiha", "Nazareth", "Or Akiva",
        "Petah Tikva", "Qiryat Shemona", "Rishon LeZion", "Safed",
        "Tel Aviv", "Umm al-Fahm", "Yavne", "Zichron Yaakov"
    ];
    //what to do in case there is no user
    useEffect(() => {
        if (!location.state?.user) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'משתמש לא נמצא, חזרה לדף הבית',
            });
            navigate('/');
        }
    }, [location.state, navigate]);

    const handleChange = (key, value) => {
        setEditedUser((prev) => ({
            ...prev,
            [key]: value,
        }));

        if (key === 'city') {
            const matchingCities = citiesList.filter(city =>
                city.toLowerCase().startsWith(value.toLowerCase())
            );
            setFilteredCities(value ? matchingCities.slice(0, 3) : []);
        }
    };

        //edit user details
    const editUser = (e) => {
        e.preventDefault();
        const isValid = validateUser(editedUser, citiesList);
        if (!isValid) return;
        sessionStorage.setItem('currentUser', JSON.stringify(editedUser));

        const storedUsers = localStorage.getItem('usersList');
        if (storedUsers) {
            const users = JSON.parse(storedUsers);
            const updatedUsers = users.map((user) =>
                user.userName === editedUser.userName ? editedUser : user
            );
            localStorage.setItem('usersList', JSON.stringify(updatedUsers));
        }
    
        Swal.fire({
            icon: 'success',
            title: "Success",
            text: "Details updated successfully",
        });
    };
    const buttonStyles = {
        display: 'flex',
        backgroundColor: '#4a6fb9',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
    };
    
    const buttonContainer = {
        display: 'flex',
        justifyContent: 'center',
    };
    return (
        <div>
            <h3>Edit Details</h3>
            <form style={{ margin: '20px auto', padding: '20px', backgroundColor: '#4a6fb9', borderRadius: '10px' }} onSubmit={editUser}>
                {Object.entries(editedUser).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: '15px' }}>
                        <label htmlFor={key} style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>
                            {key}
                        </label>
                        {key === 'city' ? (
                            <>
                                <input
                                    id={key}
                                    type="text"
                                    style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '5px' }}
                                    value={value || ''}
                                    placeholder="city"
                                    list="cityOptions"
                                    onChange={(e) => handleChange(key, e.target.value)}
                                />
                                <datalist id="cityOptions">
                                    {filteredCities.map((city, index) => (
                                        <option key={index} value={city} />
                                    ))}
                                </datalist>
                            </>
                        ) : key === 'password' ? (
                            <>
                                <input
                                    id={key}
                                    type="password"
                                    style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '5px' }}
                                    value={value || ''}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                />
                                <p>Confirm Password</p>
                                <input
                                    id="validatePassword"
                                    type="password"
                                    style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '5px' }}
                                    value={editedUser.validatePassword || ''}
                                    onChange={(e) => handleChange('validatePassword', e.target.value)}
                                />
                            </>
                        ) : (
                            <input
                                id={key}
                                type="text"
                                style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '5px' }}
                                value={value || ''}
                                onChange={(e) => handleChange(key, e.target.value)}
                            />
                        )}
                    </div>
                ))}
                <div style={buttonContainer}>
                <button type="submit" style={buttonStyles}>
                    עדכון
                </button></div>
            </form>
        </div>
    );
}
