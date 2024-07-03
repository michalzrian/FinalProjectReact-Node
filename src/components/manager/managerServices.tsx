import React from 'react';
import './css/managerServicresStyle.css';

function ManagerServices() {
    return (
        <div>
            <header>
                <h1>Our Services</h1>
                <p>Check Out What We Offer</p>
            </header>
            <section>
                <h2>Service List</h2>
                <div className="services-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Service Type</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Music lessons</td>
                                <td>Courses and lesson to know playing perfect! from the best teachers</td>
                                <td>70 shekels for a lesson</td>
                                <td>40 minutes for a lesson</td>
                            </tr>
                            <tr>
                                <td>Buying our product</td>
                                <td>Providing the best companies of Musical instruments</td>
                                <td></td>
                                <td>between 8:00 - 21:00</td>
                            </tr>
                            <tr>
                                <td>Series of Meetings</td>
                                <td>Multiple sessions tailored to your needs</td>
                                <td>50 shekels</td>
                                <td>1 hours</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default ManagerServices;
