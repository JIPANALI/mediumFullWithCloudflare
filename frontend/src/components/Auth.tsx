
import { Link, useNavigate } from "react-router-dom"
import { SignUpInput } from "@metavy/medium-jip-common"; //which i declare the zod validation in common that i have 
import "./Auth.css"
import { ChangeEvent, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { BACKEND_URL } from "../config"
import { Alert } from "antd";




const Auth = ({ type }: { type: "signup" | "signin" }) => {
 
    const [alerttogle, setalerttogle] = useState(false)
    const navigate = useNavigate()
    const [postInput, setpostInput] = useState<SignUpInput>({
        name: "",
        email: "",
        password: ""
    })
    console.log(postInput)


    async function sendRequest() {
        try {       //here if also conditionally sending the post request  like type is signin then signin put then send the request
            const response = await axios.post(`${BACKEND_URL}/app/v1/user/${type === "signin" ? "signin" : "signup"}`, postInput);
            console.log('Response:', response); // Log the response
            const jwt = response.data.jwt;
            const name = response.data.name;
            console.log('JWT:', jwt);
            localStorage.setItem("token", jwt); //here jwt is set in local storage 
            localStorage.setItem("name", name)

     
            navigate("/blog");
        } catch (error) {
            console.error('Error:', error); // Log any errors
            setalerttogle(true)
        }
    }
    return (
        <div className="auth-bg">
            <div className="auth-signup-container">
                <div>
                    <h2 style={{ fontSize: "24px" }}>{type === "signin" ? "Login " : "Create an Account"}</h2>

                </div>
                <div style={{ marginTop: "10px" }}>

                    {type === "signup" ? <LabelledInput label="Name" type="name" placeholder="Enter your name" onChange={(e) => {
                        setpostInput({
                            ...postInput, //whatever the state value and here only update the name value
                            name: e.target.value
                        })
                    }} /> : null}

                    <LabelledInput label="Username" type="email" placeholder="Enter Email" onChange={(e) => {
                        setpostInput({
                            ...postInput, //whatever previous value 
                            email: e.target.value//and here emaill will be update
                        })
                    }} />
                    <LabelledInput label="password" type="password" placeholder="Enter password" onChange={(e) => {
                        setpostInput({
                            ...postInput,
                            password: e.target.value
                        })
                    }} />
                    {/* all are conditional rendering component like if signup or sign we will do in same component with the condition rendering */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={sendRequest} sx={{ background: "4C3BCF", width: "70%", marginTop: "20px" }} variant="contained">{type === "signup" ? "Signup" : "Signin"}</Button>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <p style={{ fontSize: "11px" }}>{type === "signin" ? "DOnt have account" : "Already have an account?"}
                            <Link className="link-col" to={type === "signin" ? "/signup" : "/signin"}> {type == "signin" ? "Sign up" : "signin"}</Link>
                        </p>
                    </div>
                    {alerttogle ? <div className="" style={{position:"absolute",top:"65px",left:"40%",width:"15rem"}}><Alert
                        message="Wrong Input"
                        style={{ backgroundColor: 'red',color:"white"}}
                       
                        showIcon
                        closable
                    /> </div>: null}


                </div>
            </div>
        </div>
    )
}

export default Auth


interface LabelledInputType { //type is declare for the LabelledInput component props which you have passed given component
    label: string;
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;//this changing event type of the htmlinput element is return void type 
    type?: string //this optional
}
//This is the Input component like enter your name or enter your password
function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div className="input-comp" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label>{label}</label>
        <input className="input-box" type={type} onChange={onChange} placeholder={placeholder}></input>
    </div>
}