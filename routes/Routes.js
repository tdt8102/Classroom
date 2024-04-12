import React from 'react';
import { Route, Navigate, Routes, Outlet } from 'react-router-dom';

export function IsUserRedirect({ user, loggedInPath, children, ...rest }) {
    if (!user) {
        return children;
    }
    if (user) {
        return <Navigate to={{ pathname: loggedInPath }} />;
    }

    return <Outlet />;

    // return null;
}

export function ProtectedRoute({ user, children, ...rest }) {
    return (
        <Routes>
            <Route
                {...rest}
                render={({ location }) => {
                    if (user) {
                        return children;
                    }

                    if (!user) {
                        return (
                            <Navigate
                                to={{
                                    pathname: 'signin',
                                    state: { from: location },
                                }}
                            />
                        )
                    }
                    return null
                }}
            />
        </Routes>
    )
}

// import React from 'react';
// import { Navigate } from "react-router";
// import { auth } from '../lib/firebase';


// export function ProtectedRoute({ user, children, ...rest }) {

//     return auth ? children : <Navigate to="/signin" />;
// }

// export function IsUserRedirect({ user, loggedInPath, children, ...rest }) {

//     return auth ? children : <Navigate to="/signin" />;
// }

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";

// export function IsUserRedirect({ user, loggedInPath, children, ...rest }) {
//     const navigate = useNavigate();
//     console.log(user);

//     return (
//         <Routes>
//             <Route
//                 {...rest}
//                 render={() => {
//                     if (!user) {
//                         return children;
//                     }
//                     if (user) {
//                         navigate(loggedInPath);
//                         return null; // Optional: You can remove this line if you don't need immediate rendering
//                     }
//                     return null;
//                 }}
//             />
//         </Routes>
//     );
// }

// export function ProtectedRoute({ user, children, ...rest }) {
//     const navigate = useNavigate();
//     console.log(user);
//     console.log(children);
//     return (
//         <Routes>
//             <Route
//                 {...rest}

//                 render={({ location }) => {
//                     if (user) {
//                         console.log("1");
//                         return children;
//                     }
//                     if (!user) {
//                         console.log("2");
//                         console.log(location);
//                         navigate("/signin", { state: { from: location } });
//                         return null; // Optional: You can remove this line if you don't need immediate rendering
//                     }
//                     return null;
//                 }}
//             />
//         </Routes>
//     );
// }
// import React from "react";
// import { Redirect, Route } from "react-router-dom";

// export function IsUserRedirect({ user, loggedInPath, children, ...rest }) {
//     return (
//         <Route
//             {...rest}
//             render={() => {
//                 if (!user) {
//                     return children;
//                 }
//                 if (user) {
//                     return <Redirect to={{ pathname: loggedInPath }} />;
//                 }
//                 return null;
//             }}
//         />
//     );
// }

// export function ProtectedRoute({ user, children, ...rest }) {
//     return (
//         <Route
//             {...rest}
//             render={({ location }) => {
//                 if (user) {
//                     return children;
//                 }
//                 if (!user) {
//                     return (
//                         <Redirect
//                             to={{
//                                 pathname: "signin",
//                                 state: { from: location },
//                             }}
//                         />
//                     );
//                 }
//                 return null;
//             }}
//         />
//     );
// }