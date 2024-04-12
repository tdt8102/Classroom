import React from 'react'
import { Button } from "@mui/material";
import logo from "../../assets/HUNRE_Logo.png";
import "./style.css";
import { useLocalContext } from '../../context/context';

const Login = () => {
    const { login, loggedInUser } = useLocalContext();

    console.log('login: ', loggedInUser);
    return (
        <div className="login">
            <img className="login__logo" src={logo} alt="Classroom" />

            <Button variant="contained" color="primary" onClick={() => login()}>
                Đăng nhập
            </Button>
        </div>
    )
}

export default Login
