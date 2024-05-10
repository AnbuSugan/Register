import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');


    const handleLogin = (userId) => {
       
        if (!name.trim()) {
            setNameError('Name is required');
            return;
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            return;
        }
        axios.post('http://localhost:3001/login', { name, password })
            .then(result => {
                if (result.data.message === 'Login successful') {
                    navigate('/home');
                } else {
                    setError('Username or password incorrect');
                }
            })
            .catch(err => {
                console.log(err);
                setError('Failed to log in. Please try again.');
            });
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
        <div className='loginWrapper'>
        <div className='create_form' id='loginWrapper'>
            <h2 className='loginTitle'>Login Form</h2>
            <label className='labelName'>Name: </label><br/>
            <input 
                type="text" 
                placeholder='Enter Your Name' 
                value={name} 
                onChange={handleNameChange}
            /><br/>
             <span className='errorName'>{nameError}</span><br/>
            <label className='labelPassword'>Password:</label><br/>
            <input 
                type="password" 
                placeholder='Enter Your Password' 
                value={password} 
                onChange={handlePasswordChange}
            /><br/>
           <span className='errorPassword'>{passwordError}</span><br/>
           <span className='error'>{error}</span><br/>

            <button type="button" onClick={handleLogin}>Login</button><br/>

            <p>You have not Register, Please Register Your Details!</p>
            <Link to="/">
      <button type="button">Register</button>
    </Link>
        </div>
        </div>
    );
}

export default Login;
