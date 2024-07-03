import React from 'react';
import './css/managerDashboardStyle.css';

function ManagerDashboard() {
    return (
        <div>
            <header>
                <h1>Business Details</h1>
                <p>Contact and Business Information</p>
            </header>
            <section>
                <h2>About the Business</h2>
                <div className="business-info">
                    <p><strong>Business Name:</strong> michal zrian</p>
                    <p><strong>Address:</strong> Meromei Sade 14, Modiin Ilit, Ysrael</p>
                    <p><strong>Phone:</strong> 0556728188</p>
                    <p><strong>Email:</strong>m43797@gmail.com</p>
                </div>
            </section>
        </div>
    );
}

export default ManagerDashboard;
