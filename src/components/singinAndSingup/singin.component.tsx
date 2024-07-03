import React, { useEffect, useState } from 'react';
import './css/signin.css';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useApi';

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [useLoading, setUseLoading] = useState('');
    const [usechange, setUsechange] = useState(false);
    const { data, error, fetchData } = useFetch();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        fetchData('/users/login', 'POST', { email, password });
    };
    useEffect(() => {
        if (data) {
            const { message, user } = data;
            if (message === "User not found") {
                setUsechange(true)
                setUseLoading('This user does not exist. Redirecting to Sign Up...');
                setTimeout(() => { navigate('/SignUp'); setUsechange(false) }, 20000);
            } else if (message === "The password is incorrect!") {
                setFormError('The email or password is incorrect.');
            } else if (user) {
                const { role } = user;
                if (role === 'admin') {
                    setUsechange(true);
                    setUseLoading('Hello Admin, redirecting...');
                    setTimeout(() => { navigate('/ManagerHomePage'); setUsechange(false) }, 2000);
                } else {
                    setUsechange(true);
                    setUseLoading('Hello user, redirecting...');
                    setTimeout(() => { navigate('/HomePage'); setUsechange(false) }, 2000);
                }
            }
        } else if (error) {
            setFormError('Something went wrong. Login failed!');
        }
    }, [data, error, navigate]);
    return (
        <div>
            {usechange ? (
                <div>
                    {useLoading && <div className="loading-message">{useLoading}</div>}
                </div>
            ) : (
                <div className="signin-container">
                    <h2>Sign In</h2>
                    <form className="signin-form" onSubmit={handleSubmit}>
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
                        <div>
                            <button type="submit" className="signin-button">Sign In</button>
                        </div>
                    </form>

                </div>
            )}
        </div>
    );
}
export default SignIn;



