import React, { useState } from "react";
import Axios from "axios";
// import "./css/signup.css";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formValues, setFormValues] = useState({
        name: "",
        username: "",
        password: "",
        reenter: ""
    })
    const handleChange = (e)=> {
        const {name, value} = e.target;
        setFormValues({...formValues,[name]:value});
    }
    const submit = async (e)=>{
        e.preventDefault();
        if(formValues.password!==formValues.reenter){
            setError("password mismatch");
            return;
        }
        let url="http://localhost:5000/signup";
        let res = await Axios.post(url,{
            name: formValues.name,
            username: formValues.username,
            password: formValues.password
        })
        //.then(res => {
            if(res.data.success==="false"){
                setError(res.data.message);
                console.log(res.data.message);
            }
            else{
                localStorage.setItem("user",formValues.username);
                setError("");
                console.log(res.data.success+" "+res.data.message);
                let path = "/home";
                navigate(path);
            }
        // }).catch(err => {
        //     console.log(err);
        // })
    }

    return(
        <div className="center">
            <h1>Signup</h1>
            <form onSubmit={(e) => submit(e)}>
                <div className="error">{error}</div>
                <input type="hidden" autoFocus="autoFocus" />
                <div className="text_field">
                    <input
                        onChange = {(e)=> handleChange(e)}
                        value={formValues.name}
                        type="text"
                        name="name"
                        autoComplete="off"
                    />
                    <span></span>
                    <label>Name</label>
                </div>
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
                <div className="text_field">
                    <input
                        onChange = {(e)=> handleChange(e)}
                        value={formValues.reenter}
                        type="password"
                        name="reenter"
                        autoComplete="off"
                    />
                    <span></span>
                    <label>Re-Enter Password</label>
                </div>
                <input type="submit" value="Submit" />
                <div className="signup_link">
                    Existing user? <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup;