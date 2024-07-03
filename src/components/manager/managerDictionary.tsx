
import { useContext, useEffect, useState } from 'react';
import { DictionaryContext } from '../../context/managerDictionary.context';
import './css/managerDictionary.css';
import { ObjectId } from 'mongodb';

function ManagerDictionary() {
    const managerDictionaryContext = useContext(DictionaryContext);
    if (!managerDictionaryContext) {
        throw new Error('ManagerDictionary must be used within a DictionaryProvider');
    }
    const { dictionary, addMeeting, updateMeeting, deleteMeeting } = managerDictionaryContext;

    const [dictionarySorts, setDictionary] = useState(dictionary)
    const [serviceType, setServiceType] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [formError, setFormError] = useState('');
    const [editingMeetingId, setEditingMeetingId] = useState<string | null>(null);

    const [sortBy, setSortBy] = useState('');
    useEffect(() => {
        console.log("in useeffect dictionary");
        
        setDictionary(dictionary);
    }, [dictionary,editingMeetingId]);

    useEffect(() => {
        if (!dictionary) return;
        handleSorting(sortBy);
    }, [sortBy, dictionary]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (!serviceType || !dateTime || !customerName || !phone) {
            setFormError('Please fill out all required fields.');
            return;
        }
        const newMeeting = {
            _id: '',
            type: serviceType,
            date: dateTime,
            name: customerName,
            phone: phone
        };
        addMeeting(newMeeting);
        // setId(lastId + 1);
        resetForm();
    };
    const handleEditSubmit = (event: any) => {
        event.preventDefault();
        if (!serviceType || !dateTime || !customerName || !phone) {
            setFormError('Please fill out all required fields.');
            return;
        }
        if (editingMeetingId) {
            console.log("in handle edit submit func");
            
            const updatedMeeting = {
                _id: editingMeetingId,
                type: serviceType,
                date: dateTime,
                name: customerName,
                phone: phone
            };
            updateMeeting(updatedMeeting);
            
            setEditingMeetingId(null);
        }
        resetForm();
    };

    const resetForm = () => {
        setServiceType('');
        setDateTime('');
        setCustomerName('');
        setPhone('');
        setFormError('');
    };

    const handleEdit = (meeting: any) => {
        console.log(meeting._id);
        setServiceType(meeting.type);
        setDateTime(meeting.date);
        setCustomerName(meeting.name);
        setPhone(meeting.phone);
        setEditingMeetingId(meeting._id);
        console.log("after edit meeting" , meeting)
    };
    const handleSorting = (sortOption: any) => {
        if (!dictionary) return;
        let sortedDictionary = [...dictionary];
        if (sortOption === 'name') {
            sortedDictionary.sort((a, b) => a.name.localeCompare(b.name));
        }
        else if (sortOption === 'date') {
            sortedDictionary.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }
        setDictionary(sortedDictionary);
    };

    return (<>

        <div className="sorting-section">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="">Sort by...</option>
                <option value="name">Sort by name</option>
                <option value="date">Sort by date</option>
            </select>
        </div>
        <div className="container">
            <section className="dictionary-section">
                <h2>Meeting Schedule</h2>
                <ul className="meeting-list">
                    {dictionarySorts?.map((meeting,index) => (
                        <li key={meeting?._id || `meeting-${index}`}  className="meeting-item">
                            {meeting && editingMeetingId === meeting?._id ? (
                                <form className="edit-form" onSubmit={handleEditSubmit}>
                                    <input
                                        type="datetime-local"
                                        value={dateTime}
                                        onChange={(e) => setDateTime(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                    <select
                                        id="serviceType"
                                        value={serviceType}
                                        onChange={(e) => setServiceType(e.target.value)}
                                        required
                                    >
                                        <option value="">Select service type</option>
                                        <option value="Music lessons">Music lessons</option>
                                        <option value="Buying our product">Buying our product</option>
                                        <option value="Advices and questions">Advices and questions</option>
                                    </select>
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={() => setEditingMeetingId(null)}>Cancel</button>
                                    {formError && <p className="form-error">{formError}</p>}
                                </form>
                            ) : (
                                <>
                                    <p><strong>Date:</strong> {meeting?.date}</p>
                                    <p><strong>Name:</strong> {meeting?.name}</p>
                                    <p><strong>Phone:</strong> {meeting?.phone}</p>
                                    <p><strong>Type:</strong> {meeting?.type}</p>
                                    <button onClick={() => handleEdit(meeting)}>Edit</button>
                                    <button onClick={() => deleteMeeting(meeting._id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
                <form className="meeting-form" onSubmit={handleSubmit}>
                    <h3>Add Meeting</h3>
                    <input
                        type="datetime-local"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <select id="serviceType" value={serviceType} onChange={(e) => setServiceType(e.target.value)} required>
                        <option value="">Select service type</option>
                        <option value="Music lessons">Music lessons</option>
                        <option value="Buying our product">Buying our product</option>
                        <option value="Advices and questions">Advices and questions</option>
                    </select>
                    <button type="submit">Add Meeting</button>
                    {formError && <p className="form-error">{formError}</p>}
                </form>
            </section>
        </div>
    </>
    );
}

export default ManagerDictionary;
