import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
import app from '../firebase/firebase.config';

const auth = getAuth(app);
export const AuthContext = createContext();

const Context = ({children}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    const usersRegister = (auth, email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userLogin = (auth, email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const userUpdate = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        });
    }

    const logOut = (auth) => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () =>  unsubscribe;
    },[user])

    const userInfo = {
        user,
        setUser,
        loading,
        usersRegister,
        userLogin,
        userUpdate,
        logOut,
        setLoading

    }
    return (
        <div>
            <AuthContext.Provider value={userInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default Context;