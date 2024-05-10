
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        if (!name.trim()) {
            setNameError('Name is required');
            return;
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            return;
        }

        axios.post('http://localhost:3001/register', { name, password })
            .then(result => {
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        setNameError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    };

    return (
        <div className='registerWrapper'>
           
        <div className='create_form' id='registerWrapper'>
        <h2 className='headTitleRegister'>Register Form</h2>
            <label className='labelNames'>Name:</label><br/>
            <input 
                type="text" 
                placeholder='Enter Your Name' 
                value={name} 
                onChange={handleNameChange}
            /><br/>
            <span className='errorName'>{nameError}</span><br/>

            <label className='labelPasswords'>Password:</label><br/>
            <input 
                type="password" 
                placeholder='Enter Your Password' 
                value={password} 
                onChange={handlePasswordChange}
            /><br/>
            <span className='errorPassword'>{passwordError}</span><br/>

            <button type="button" onClick={handleRegister}>Register</button><br/>

            <p>Already registered? Please Login!</p>
            <Link to="/login">
                <button type="button">Login</button>
            </Link>
        </div>
        </div>
    );
}

export default Register;

