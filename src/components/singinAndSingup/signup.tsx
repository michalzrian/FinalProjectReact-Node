
import React, { useContext, useEffect, useState } from 'react';
import './css/signup.css';
import { UsersContext } from '../../context/managerClients.context';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useApi';
import { CurrentContextUser } from '../../context/currentUserContext';

function Signup() {
    const managerUsersContext = useContext(UsersContext);
    const { addUser } = managerUsersContext;
    const currentUserContext = useContext(CurrentContextUser);
    const { setCurrentUser, currentUser } = currentUserContext;
    const { fetchData } = useFetch();

    const [customerName, setCustomerName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [profile, setProfile] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        console.log("currentUser", currentUser);
    }, [currentUser]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!customerName || !email || !password) {
            setFormError('Please fill out all required fields.');
            return;
        }
        const filePath = await fileUpload();
        console.log("filePath", filePath);
        if (filePath) {
            handleAddUser(filePath);
        }
    };

    const fileUpload = async () => {
        const formData = new FormData();
        formData.append('profileImage', profile!);
        try {
            const uploadFile = await fetchData('/users/upload', 'POST', formData);
            return uploadFile.filePath;
        } catch (error) {
            console.log('Error uploading file:', error);
            return null;
        }
    };
    const handleAddUser = async (filePath: string) => {
        const newUser = {
            id: 1,
            name: customerName,
            email: email,
            password: password,
            profileImage: filePath,
        };
        try {
            await addUser(newUser);
            await setCurrentUser(newUser);
            console.log("currentUser", currentUser);


            navigate('/HomePage');
        } catch (error) {
            console.log('Error adding user:', error);
        }
    };
    const handleChange = (event: any) => {
        setProfile(event.target.files[0]);
    }

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {formError && <div className="form-error">{formError}</div>}
                <div className="form-group">
                    <label htmlFor="email">profile:</label>
                    <input id="file" type="file" onChange={handleChange} accept="image/*" />
                </div>
                <div>
                    <button type="submit" className="signup-button">Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;
