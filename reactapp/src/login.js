import React, { useState } from "react";
import Axios from "axios";
import "./css/login.css";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formValues, setFormValues] = useState({
        username: "",
        password: ""
    })
    const handleChange = (e)=> {
        const {name, value} = e.target;
        setFormValues({...formValues,[name]:value});
    }
    const submit = async (e)=>{
        e.preventDefault();
        let url="http://localhost:5000/login";
        let res = await Axios.post(url,{
            username: formValues.username,
            password: formValues.password
        })
        //.then(res => {
            if(res.data.success==="false"){
                setError(res.data.message);
                console.log(res.data.message);
            }
            else{
                //console.log("haha "+localStorage.getItem("user"));
                //localStorage.removeItem("user");
                localStorage.setItem("user",formValues.username);
                //console.log("here "+ res.data.success);
                setError("");
                let path = "/home";
                navigate(path);
            }
        // }).catch(err => {
        //     console.log(err);
        // })
    }

    return(
        <div className="center">
            <h1>Login</h1>
            <form onSubmit={(e) => submit(e)}>
                <div className="error">{error}</div>
                <input type="hidden" autoFocus="autoFocus" />
                <div className="text_field">
                    <input
                        onChange = {(e)=> handleChange(e)}
                        value={formValues.username}
                        type="text"
                        name="username"
                        autoComplete="off"
                    />
                    <span></span>
                    <label>Username</label>
                </div>
                <div className="text_field">
                    <input
                        onChange = {(e)=> handleChange(e)}
                        value={formValues.password}
                        type="password"
                        name="password"
                        autoComplete="off"
                    />
                    <span></span>
                    <label>Password</label>
                </div>
                <input type="submit" value="Submit" />
                <div className="signup_link">
                    New user? <Link to="/signup">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;