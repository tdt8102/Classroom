import React, { useState } from 'react'
import { useLocalContext } from '../../context/context'
import { Avatar, Button, Dialog, Slide, TextField } from '@mui/material';
import { Close } from '@mui/icons-material'
import "./style.css"
import db from '../../lib/firebase';
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})
const JoinClass = () => {
    const { joinClassDialog, setJoinClassDialog, loggedInUser } = useLocalContext();
    const [classeCode, setClassCode] = useState();
    const [email, setemail] = useState();
    const [error, setError] = useState();
    const [joinedData, setJoinedData] = useState();
    const [classExists, setClassExists] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const classRef = doc(collection(db, "CreatedClasses"), email, "classes", classeCode);
        getDoc(classRef).then((doc) => {
            if (doc.exists() && doc.data().owner !== loggedInUser.email) {
                setClassExists(true);
                setJoinedData(doc.data());
                setError(false);

                const joinedClassRef = doc(collection(db, 'JoinedClasses'), loggedInUser.email, "classes", classeCode);
                setDoc(joinedClassRef, {
                    joinedData: doc.data(),
                })
                    .then(() => {
                        setJoinClassDialog(false);
                    });
            } else {
                setError(true);
                setClassExists(false);
            }
        });

        if (classExists === true) {
            const joinedClassRef = doc(collection(db, 'JoinedClasses'), loggedInUser.email, "classes", classeCode);
            setDoc(joinedClassRef, {
                joinedData,
            })
                .then(() => {
                    setJoinClassDialog(false);
                });
        }
    };

    // addDoc(collection(db, "CreatedClasses"){
    //         .doc(email)
    //         .collection('classes')
    //         .doc(classeCode)
    //         .get()
    //         .then((doc) => {
    //             if (doc.exists && doc.owner !== loggedInUser.email) {
    //                 setClassExists(true);
    //                 setJoinedData(doc.data());
    //                 setError(false);
    //             } else {
    //                 setError(true);
    //                 setClassExists(false);
    //                 return;
    //             }
    //         })
    // })

    return (
        <div>
            <Dialog
                fullScreen
                open={joinClassDialog}
                onClose={() => setJoinClassDialog(false)}
                TransitionComponent={Transition}
            >
                <div className="joinClass">
                    <div className="joinClass__wrapper">

                        <div
                            className="joinClass__wrapper2"
                            onClick={() => setJoinClassDialog(false)}
                        >
                            <Close className="joinClass__svg" />
                            <div className="joinClass__topHead">Vào lớp</div>
                        </div>
                        <Button
                            className="joinClass__btn"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Vào
                        </Button>
                    </div>
                    <div className="joinClass__form">
                        <p className="joinClass__formText">
                            Bạn đang đăng nhập bằng {loggedInUser?.email}
                        </p>
                        <div className="joinClass__loginInfo">
                            <div className="joinClass__classLeft">
                                <Avatar src={loggedInUser?.photoURL} />
                                <div className="joinClass__loginText">
                                    <div className="joinClass__loginName">{loggedInUser?.displayName}</div>
                                    <div className="joinClass__loginEmail">{loggedInUser?.email}</div>
                                </div>
                            </div>
                            <Button variant="outlined" color="primary">
                                Đăng xuất
                            </Button>
                        </div>
                    </div>
                    <div className="joinClass__form">
                        <div style={{ fontSize: '1.25rem', color: '#3c4043' }}
                            className="joinClass__formText">
                            Mã lớp
                        </div>
                        <div style={{ color: '#3c4043', marginTop: '-5px' }}
                            className='joinClass__formText'>
                            Đề nghị giáo viên của bạn cung cấp mã lớp rồi nhập mã đó vào đây.
                        </div>
                        <div className='joinClass__loginInfo'>
                            <TextField
                                id="outlined-basic"
                                label="Mã lớp"
                                variant="outlined"
                                value={classeCode}
                                onChange={(e) => setClassCode(e.target.value)}
                                error={error}
                                helperText={error && 'Không tìm thấy lớp học'}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Email của chủ sở hữu"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

            </Dialog>
        </div>
    )
}

export default JoinClass

