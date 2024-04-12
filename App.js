// import React from 'react';
// import { Drawer, Login } from './components';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// function App() {
//   const{loggedInMail} = useLocalContext();
//   return (
//     <Router>
//       <Routes>  {/* Replace Switch with Routes */}
//         <IsUserRedirect
//         user={loggedInMail}
//         loggedInPath="/"
//         path="/signin"
//         exact>
//           <Login/>
//         </IsUserRedirect>
//         <ProtectedRoute user={loggedInMail} path="/" exact>
//           <Drawer/>
//         </ProtectedRoute>
//       </Routes>
//     </Router>
//   );
// }
// export default App;

// import React from 'react';
// import { Drawer, Login } from './components';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { IsUserRedirect, ProtectedRoute } from './routes/Routes';
// import { useLocalContext } from './context/context';

// function App() {

//   const { loggedInMail } = useLocalContext();
//   return (
//     <Router>
//       <Routes>
//         <Route
//           user={loggedInMail}
//           path="/signin"
//           exact
//           loggedInPath='/'
//           element={
//             <IsUserRedirect />
//           } />

//         <Route
//           user={loggedInMail}
//           path="/"
//           exact
//           element={
//             <ProtectedRoute />
//           } />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import { Drawer, Login, JoinedClasses } from './components';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { IsUserRedirect, ProtectedRoute } from "./routes/Routes";
import { useLocalContext } from './context/context';
import { Draw } from '@mui/icons-material';
import db from './lib/firebase';

function App() {
  const { loggedInMail } = useLocalContext();
  console.log(loggedInMail);
  const [createdClasses, setCreatedClasses] = useState([]);
  const [joinedClasses, setJoinedClasses] = useState([]);
  useEffect(() => {
    if (loggedInMail) {
      let unsubscribeCreated = db
      // .collection("CreatedClasses")
      //     // .doc(loggedInMail)
      //     // .collection("classes")
      //     .onSnapshot((snapshot) => {
      //       setCreatedClasses(snapshot.docs.map((doc) => doc.data()));
      //     });
      //   // return () => unsubscribeCreated();
    }
  }, [loggedInMail]);

  // useEffect(() => {
  //   if (loggedInMail) {
  //     let unsubscribeJoined = db
  //       .collection("JoinedClasses")
  //       .doc(loggedInMail)
  //       .collection("classes")
  //       .onSnapshot((snapshot) => {
  //         setJoinedClasses(snapshot.docs.map((doc) => doc.data().joinedData));
  //       });

  //     return () => unsubscribeJoined();
  //   }
  // }, [loggedInMail]);
  return (
    <Router>
      <Routes>  {/* Wrap Routes around your Route components */}
        <Route
          exact
          path="/signin/*"
          element={
            <IsUserRedirect
              exact
              user={loggedInMail}
              loggedInPath="/"
              path="/signin/*"
            >
              <Login />
            </IsUserRedirect>}
        ></Route>
        <Route
          exact
          path="*"
          element={
            <ProtectedRoute
              user={loggedInMail}>
              <Drawer />
              <ol className="joined">
                {createdClasses.map((item) => (
                  <JoinedClasses classData={item} />
                ))}

                {joinedClasses.map((item) => (
                  <JoinedClasses classData={item} />
                ))}
              </ol>
            </ProtectedRoute>}
        ></Route>
      </Routes>
      <Drawer />
    </Router>
  );
}

export default App;
