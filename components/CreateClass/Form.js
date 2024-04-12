// import { Button, DialogActions, TextField } from '@mui/material'
// import React from 'react'

// const Form = () => {
//     return (
//         <div className='form'>
//             <p className='class__title'>Tạo lớp học</p>

//             <div className='form__inputs'>
//                 <TextField
//                     id='filled-basic'
//                     label="Tên lớp học (bắt buộc)"
//                     className='form__input'
//                     variant='filled'
//                 ></TextField>

//                 <TextField
//                     id='filled-basic'
//                     label="Phần"
//                     className='form__input'
//                     variant='filled'
//                 ></TextField>

//                 <TextField
//                     id='filled-basic'
//                     label="Chủ đề"
//                     className='form__input'
//                     variant='filled'
//                 ></TextField>

//                 <TextField
//                     id='filled-basic'
//                     label="Phòng"
//                     className='form__input'
//                     variant='filled'
//                 ></TextField>

//             </div>
//             <DialogActions>
//                 <Button color='primary' >Tạo</Button>
//             </DialogActions>
//         </div>
//     )
// }

// export default Form

import { Button, DialogActions, TextField } from "@mui/material";
import React, { useState } from "react";
import { useLocalContext } from "../../context/context";
import { v4 as uuidV4 } from "uuid";
import db from "../../lib/firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

const Form = () => {
    const [className, setClassName] = useState("");
    const [Section, setSection] = useState("");
    const [Room, setRoom] = useState("");
    const [Subject, setSubject] = useState("");

    const { loggedInMail, SetCreateClassDialog } = useLocalContext();

    const addClass = (e) => {
        e.preventDefault();
        const id = uuidV4();

        // db.collection("CreatedClasses")
        //     .doc(loggedInMail)
        //     .collection("classes")
        //     .doc(id)
        //     .set({
        //         owner: loggedInMail,
        //         className: className,
        //         section: Section,
        //         room: Room,
        //         id: id,
        //     })
        //     .then(() => {
        //         setCreateClassDialog(false);
        //     });

        const classRef = doc(collection(db, "CreatedClasses"), loggedInMail, "classes", id);
        setDoc(classRef, {
            owner: loggedInMail,
            className: className,
            section: Section,
            room: Room,
            id: id,
        })
            .then(() => {
                SetCreateClassDialog(false);
            })
    };
    return (
        <div className="form">
            <p className="class__title">Tạo lớp học</p>

            <div className="form__inputs">
                <TextField
                    id="filled-basic"
                    label="Tên lớp học (bắt buộc)"
                    className="form__input"
                    variant="filled"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                />
                <TextField
                    id="filled-basic"
                    label="Phần"
                    className="form__input"
                    variant="filled"
                    value={Section}
                    onChange={(e) => setSection(e.target.value)}
                />
                <TextField
                    id="filled-basic"
                    label="Chủ đề"
                    className="form__input"
                    variant="filled"
                    value={Subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <TextField
                    id="filled-basic"
                    label="Phòng"
                    className="form__input"
                    variant="filled"
                    value={Room}
                    onChange={(e) => setRoom(e.target.value)}
                />
            </div>
            <DialogActions>
                <Button onClick={addClass} color="primary">
                    Tạo
                </Button>
            </DialogActions>
        </div>
    );
};

export default Form;