// import { createContext, useContext, useState } from "react";

// const AddContext = createContext();

// export function useLocalContext() {
//     return useContext(AddContext)
// }

// export function ContextProvider({ children }) {
//     const [createClassDialog, setCreateClassDialog] = useState(false);//luu y cai setcreate dong nay viet hoa
//     const [joinClassDialog, setJoinClassDialog] = useState(false);

//     const value = {
//         createClassDialog,
//         setCreateClassDialog,
//         joinClassDialog,
//         setJoinClassDialog,

//     };

//     return (<AddContext.Provider value={value}>{children}</AddContext.Provider>
//     )
// }

import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

const AddContext = createContext();

export function useLocalContext() {
    return useContext(AddContext)
}

export function ContextProvider({ children }) {
    const [createClassDialog, SetCreateClassDialog] = useState(false);
    const [joinClassDialog, setJoinClassDialog] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loggedInMail, setloggedInMail] = useState(null);

    const login = () => signInWithPopup(auth, provider);

    const logout = () => signOut(auth);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setloggedInMail(authUser.email)
                setLoggedInUser(authUser)
            }
            else {
                setloggedInMail(null)
                setLoggedInUser(null)
            }
        });

        return () => unsubscribe();
    }, [])
    const value = {
        createClassDialog,
        SetCreateClassDialog,
        joinClassDialog,
        setJoinClassDialog,
        login,
        logout,
        loggedInUser,
        loggedInMail,
    };

    return (<AddContext.Provider value={value}>{children}</AddContext.Provider>
    )
}

// import { createContext, useContext, useEffect, useState } from "react";
// import { auth, provider } from "../lib/firebase";

// const AddContext = createContext();

// export function useLocalContext() {
//     return useContext(AddContext)
// }

// export function ContextProvider({ children }) {
//     const [createClassDialog, setCreateClassDialog] = useState(false);
//     const [joinClassDialog, setJoinClassDialog] = useState(false);
//     const [loggedInUser, setLoggedInUser] = useState(null)
//     const [loggedInMail, setLoggedInMail] = useState(null)

//     const DangNhap = () => {
//         auth.signInWithPopup(provider)
//     }

//     // const logout =()=>auth.signOut()

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((authUser) => {
//             if (authUser) {
//                 setLoggedInMail(authUser.email);
//                 setLoggedInUser(authUser);
//             } else {
//                 setLoggedInMail(null);
//                 setLoggedInUser(null);
//             }
//         });

//         return () => unsubscribe();
//     }, [])

//     const value = {
//         createClassDialog,
//         setCreateClassDialog,
//         joinClassDialog,
//         setJoinClassDialog,
//         DangNhap,
//         // logout,
//         loggedInUser,
//         loggedInMail,
//     };
//     return <AddContext.Provider value={value}>{children}</AddContext.Provider>;
// }