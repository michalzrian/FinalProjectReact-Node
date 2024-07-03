import { ReactNode, createContext, useState } from 'react';
import { managerUsers } from '../interfaces/managerClients.interfaces';
export type currentUserContext = {
    currentUser: managerUsers;
    setCurrentUser: (user: managerUsers) => void
}
const initialCurrentUser: managerUsers = {
    id: 0,
    name: '',
    email: '',
    password: '',
    profileImage: ''
};
const InitialContext: currentUserContext = {
    currentUser: initialCurrentUser,
    setCurrentUser: async () => { }
}
export const CurrentContextUser = createContext<currentUserContext>(InitialContext);


export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUsers] = useState<managerUsers>(initialCurrentUser);
    const setCurrentUser = async (user: managerUsers) => {
        setCurrentUsers(user);
    }
    return (
        <CurrentContextUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentContextUser.Provider>
    );
};