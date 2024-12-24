import {useEffect, useState } from 'react'
import validateUser from './validation'; 
import Swal from 'sweetalert2';

export default function Register() {
    const[usersList, setUserList] = useState([{userName: 'admin', password: 'ad12343211ad'}]);
    const[userName, setUserName] = useState('');
    const[password, setUserPassword] = useState('');
    const[validatePassword, setValidatePassword] = useState('');
    const[image, setValidateImage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const[birthDate, setbirthDate] = useState('');
    const [city, setCity] = useState('');

    const [citiesList] = useState([
        "Afula",
        "BeerSheva",
        "Caesarea",
        "Dimona",
        "Eilat",
        "Fureidis",
        "Giv'atayim",
        "Hadera",
        "Haifa",
        "Jerusalem",
        "Karmiel",
        "Lod",
        "Ma'alot-Tarshiha",
        "Nazareth",
        "Or Akiva",
        "Petah Tikva",
        "Qiryat Shemona",
        "Rishon LeZion",
        "Safed",
        "Tel Aviv",
        "Umm al-Fahm",
        "Yavne",
        "Zichron Yaakov",
    ]);

    //deal with image upload
    const setImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setValidateImage(reader.result); // Set Data URL to state
            };
            reader.readAsDataURL(file);
        }
    };
    
    const [filteredCities, setFilteredCities] = useState([]);
   // Load default admin user into localStorage if not exists
    useEffect(() => {
        const savedUsers = localStorage.getItem('usersList');
        if (!savedUsers) {
            const defaultUsers = [{ userName: 'admin', password: 'ad12343211ad' }];
            localStorage.setItem('usersList', JSON.stringify(defaultUsers));
            setUserList(defaultUsers);
        } else {
            setUserList(JSON.parse(savedUsers));
        }
    }, []);
    const handleCityChange = (value) => {
        setCity(value);

        //filter city list
        if (value) {
            const matchingCities = citiesList.filter((city) =>
                city.toLowerCase().startsWith(value.toLowerCase())
            );
            setFilteredCities(matchingCities.slice(0, 3)); //show top 3 cities
        } else {
            setFilteredCities([]);
        }
    };

    const [adress, setAdress] = useState('');
    const[apartmentNumber, setapartmentNumber] = useState('');
    const clearData=()=>{
        setUserList('');
        setUserName('');
        setUserPassword('');
        setValidatePassword('');
        setValidateImage('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setbirthDate('');
        setCity('');
        setAdress('');
        setapartmentNumber('');
    }

    const registerUser = (event) => {
        event.preventDefault();
    
        const newUser = {
            userName,
            password,
            validatePassword,
            email,
            birthDate,
            adress,
            image,
            firstName,
            lastName,
            city,
            apartmentNumber,
        };
    
        // Validate user
        const isValid  = validateUser(newUser, citiesList);
        if (!isValid) {
            return;
        }
    
        const updatedUsersList = [...usersList, newUser];
        setUserList(updatedUsersList);
    
        localStorage.setItem('usersList', JSON.stringify(updatedUsersList));
        console.log(" reg userList", usersList);
        console.log('Updated Users List:', updatedUsersList);
        Swal.fire("You registered successfuly");
        clearData();
    };
    
  const formStyles = {
  margin: '20px auto',
  padding: '20px',
  backgroundColor: '#4a6fb9',
  color: 'black',
  borderRadius: '10px',
        };
  const inputStyles = {
    width: '100%',
    padding: '10px',
    margin: '8px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    color:'black'

  };
  const divStyle ={
    backgroundColor: 'white'
  }
  return (
    <>
    <h3 style={{padding: '15px'}}> 
    Register
    </h3>
    <div style={divStyle}>
    <form style={formStyles} onSubmit={registerUser}>
    <p>UserName: {userName}</p>
        <input style={inputStyles}
        type='text'
        placeholder='Username'
        value={userName}
        onChange={(e)=> setUserName(e.target.value)}>
        </input>
        <p>Password</p>
        <input style={inputStyles}
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e)=> setUserPassword(e.target.value)}></input>
        <p>Validate password</p>
        <input style={inputStyles}
        type='password' 
        placeholder='Confirm Password'
        value={validatePassword}
        onChange={(e)=>setValidatePassword(e.target.value)}>
        </input>
        <p>Image: {image}</p>
        <input style={inputStyles}
        type='file' accept=".jpg, .jpeg"
        onChange={setImageUpload}
        ></input>
        <p>First name: {firstName}</p>
        <input style={inputStyles}
        type='text'
        placeholder='first name'
        value={firstName}
        onChange={(e)=>setFirstName(e.target.value)}></input>
        <p>Last name: {lastName}</p>
        <input style={inputStyles}
        type='text'
        placeholder='last name'
        value={lastName}
        onChange={(e)=>setLastName(e.target.value)}></input>
        <p>Email: {email}</p>
        <input style={inputStyles}
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}></input>
        <p>Birth date: {birthDate}</p>
        <input style={inputStyles}
        type='date'
        value={birthDate}
        onChange={(e)=>{setbirthDate(e.target.value)}}
        ></input>
       <p>City: {city}</p>
       <input
    style={inputStyles}
    type="text"
    value={city}
    placeholder="city"
    list="cityOptions"
    onChange={(e) => handleCityChange(e.target.value)}
/>
<datalist id="cityOptions">
    {filteredCities.map((city, index) => (
        <option key={index} value={city} />
    ))}
</datalist>
        <p>Adress: {adress}</p>
        <input style={inputStyles}
        type='text'
        value={adress}
        placeholder='adress'
        onChange={(e)=>setAdress(e.target.value)}></input>
        <p>Apartment number: {apartmentNumber}</p>
        <input style={inputStyles}
        type='number'
        value={apartmentNumber}
        placeholder='apartment number'
        onChange={(e)=>setapartmentNumber(e.target.value)}></input>

        <br></br>   
        <br></br>   
        <button 

        style={{background:'white', color: 'grey'}}type="submit">הרשמה</button>

    </form>
    </div>
    </>
  )
}
