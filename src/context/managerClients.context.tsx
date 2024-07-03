
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { managerUsers } from '../interfaces/managerClients.interfaces';
import { useFetch } from '../hooks/useApi';

export type managerUsersContext = {
    users?: managerUsers[],
    addUser: (newUser: managerUsers) => void,
};

const InitialUsersContext: managerUsersContext = {
    users: [],
    addUser: () => {},
};

export const UsersContext = createContext<managerUsersContext>(InitialUsersContext);

export const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<managerUsers[]>([]);
    const { data: getUsersData, error: getUsersError, fetchData: fetchUsers } = useFetch();
    const { data: postUserData,  error: postUserError, fetchData: postUser } = useFetch();

    useEffect(() => {
        fetchUsers('/users');
    }, [fetchUsers]);

    useEffect(() => {
        if (getUsersData) {
            setUsers(getUsersData);
            console.log('users', getUsersData);
        } else if (getUsersError) {
            console.log('Error fetching users:', getUsersError);
        } else if (!getUsersData) {
            console.log('not found!');
        }
    }, [getUsersData, getUsersError]);

    const addUser = async (newUser: managerUsers) => {
        try {
            await postUser('/users', 'POST', newUser);
            if (postUserData) {
                setUsers([...users, postUserData]);
            } else if (postUserError) {
                console.log('Error in adding user:', postUserError);
            }
        } catch (error) {
            console.log('Error in adding user:', error);
        }
    };

    return (
        <UsersContext.Provider value={{ users, addUser }}>
            {children}
        </UsersContext.Provider>
    );
};
