import './css/managerClientStyle.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UsersContext } from '../../context/managerClients.context';
import CurrentUser from '../users/currrentUser';

function Users() {
    const managerUsersContext = useContext(UsersContext);
    if (!managerUsersContext) {
        throw new Error('managerUsersContext must be used within a UsersProvider');
    }
    const { users } = managerUsersContext;

    return (
        <div className="users-container">
            <h2>Users List</h2>
            <ul className="users-list">
                {users?.map((user: any, index) => (
                    <div key={index}>
                       {<CurrentUser user= {user}></CurrentUser>} 
                    </div>
                    // <li key={index} className="user-item">
                    //     <p><strong>Id:</strong> {user.id}</p>
                    //     <p><strong>Name:</strong> {user.name}</p>
                    //     <p><strong>Email:</strong> {user.email}</p>
                    //     <div>
                    //         {user?.profileImage && (
                    //             <img src={`http://localhost:5000/uploads/${user.profileImage}`} alt={`${user.name}'s profile`} />
                    //         )}
                    //     </div>
                    //     {/* <p><strong>Profile:</strong>{user.profileImage}</p> */}
                    // </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;
