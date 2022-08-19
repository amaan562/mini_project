import React from "react";
import { useNavigate} from "react-router-dom";
import "../css/navbar.css"
export default function Navbar(props){
    var nameOnNav = props.name;
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.removeItem("user");
        navigate("/login");
    }
    return(
    <div className="navbar">
            <div className="left">Welcome {nameOnNav}</div>
            <div className="right">
                <button className="logout" type="button" onClick={()=>logout()}>
                    logout
                </button>
            </div>
    </div>
    );
}