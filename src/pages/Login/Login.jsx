import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
    const [user, setUser] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUserInputChange = (e) => {
        setUser(e.target.value);
        setError('');
    };

    const handleOtpInputChange = (e) => {
        const value = e.target.value;
        // regex to allow only digits and restrict to 4 characters
        if (/^\d{0,4}$/.test(value)) {
            setOtp(value);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // Check if OTP and username are not empty
        if (!!otp && !!user) {
            // Call API if credentials are valid
            setLoading(true);
            try {
                const response = await fetch('https://assignment.stage.crafto.app/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: user,
                        otp: otp,
                    }),
                });

                const data = await response.json();

                // Check if response is successful
                if (response.ok) {
                    // Navigate user to the /quote route on successful login
                    navigate('/quote');
                } else {
                    // Handle errors (e.g., invalid OTP or username)
                    setError(data.message || 'Login failed, please try again.');
                }
            } catch (err) {
                setError('An error occurred. Please try again later.');
            } finally {
                setLoading(false);
            }
        } else {
            setError('Username and OTP are required.');
        }
    };

    useEffect(() => {
        if(error) {
            setTimeout(() => {
                setError('');
            }, 3000)
        }
    }, [error])

    return (
        <div className="container">
            <div className="header">Welcome to Quotes App!</div>
            <div className="inputContainer">
                <input
                    value={user}
                    type="text"
                    placeholder="Enter User name"
                    onChange={handleUserInputChange}
                />
                <input
                    value={otp}
                    type="text"
                    placeholder="Enter OTP"
                    onChange={handleOtpInputChange}
                    maxLength={4}
                />
            </div>
            {error && <div className="error">{error}</div>}
            <div className="submitContainer">
                <div onClick={handleSubmit} className="submit">
                    {loading ? 'Submitting...' : 'Submit'}
                </div>
            </div>
        </div>
    );
};

export default Login;
