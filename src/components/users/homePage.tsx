import React, { createContext, useContext, useState } from 'react';
import './css/homePageStyle.css';
import swal from 'sweetalert';
import { DictionaryContext } from '../../context/managerDictionary.context';
import { managerMeeting } from '../../interfaces/managerDictionary.interfaces';
import { CurrentContextUser } from '../../context/currentUserContext';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const currentUserContext = useContext(CurrentContextUser);
    const { currentUser } = currentUserContext;
    const navigate = useNavigate();

    const managerDictionaryContext = useContext(DictionaryContext);
    if (!managerDictionaryContext) {
        throw new Error('ManagerDictionary must be used within a DictionaryProvider');
    }
    const { dictionary, addMeeting } = managerDictionaryContext;

    const [lastId, setId] = useState(
        dictionary && dictionary.length > 0 ? (dictionary[dictionary.length - 1]._id) as string : '')
    const [serviceType, setServiceType] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [formError, setFormError] = useState('');


    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (!serviceType || !dateTime || !customerName || !phone) {
            setFormError('Please fill out all required fields.');
            return;
        }
        handleAddMeeting();
    };

    const handleAddMeeting = () => {
        const newMeeting: managerMeeting = {
            _id: lastId,
            date: dateTime,
            name: customerName,
            phone: phone,
            type: serviceType,
        };
        addMeeting(newMeeting)
        setId(lastId + 1);
    }
    const ScheduleBtn = () => {
        if (serviceType && dateTime && customerName && phone) {
            swal("Success!", "Your request was sent successfully!", "success");
        }
    }
    const sendEmail = () => {
        navigate('/SendEmail');
    }
    return (
        <div>
            <header>
                <div id='divProfileImage'>
                    <h1 id='userName'>hi {currentUser.name}</h1>
                    <div >
                        {currentUser.profileImage && (
                            <img id='profileImage'
                                src={`http://localhost:5000/uploads/${currentUser.profileImage}`}
                                alt={`${currentUser.name}'s profile`}
                            />
                        )}
                    </div>
                </div>

            </header>
            <header>
                <h1>Welcome to Our Site</h1>
                <p>Learn More About Us and Our Services</p>
            </header>
            <section>
                <h2>About Us</h2>
                <p>We are a music site that provides music lessons, musical instruments, <br />
                    consultation and answers for all your questions!</p>
                <div className="advertisement">
                    <h2>Sale! A series of frontal lessons only 300 shekels.</h2>
                </div>
            </section>
            <section>
                <h2>Schedule an Appointment</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="serviceType">Service Type:</label>
                        <select id="serviceType" value={serviceType} onChange={(e) => setServiceType(e.target.value)} required>
                            <option value="">Select service type</option>
                            <option value="Music lessons">Music lessons</option>
                            <option value="Buying our product">Buying our product</option>
                            <option value="Advices and questions">Advices and questions</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="dateTime">Date and Time:</label>
                        <input type="datetime-local" id="dateTime" value={dateTime} onChange={(e) => setDateTime(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="note">Note for Business Owner:</label>
                        <textarea id="note"></textarea>
                    </div>
                    <div>
                        <label htmlFor="customerName">Customer Name:</label>
                        <input type="text" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    {formError && <div className="form-error">{formError}</div>}
                    <div className="app-container">
                        <button className="schedule-btn" onClick={ScheduleBtn}>
                            Schedule
                        </button>
                    </div>
                </form>
            </section>
            <div>
                <button onClick={sendEmail}>send a message</button>
            </div>
        </div>
    );
}
export default HomePage;
