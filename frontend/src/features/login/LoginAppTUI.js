import React, {useState} from "react";
import axios from "axios";
import logo from './Nter-logo.png';
// const url = "http://localhost:8000";
const url = "";

const LoginAppTUI = ({onLogin}) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);

    const authenticate = () => {
        console.log("Now authenticating....")
        setError(null);
        axios.get(`${url}/login`, {
            header: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*"
            },
            params: {username, password}
        })
            .then((res) => {
                console.log('Response - ', res);
                onLogin(true);
                setError(null);
            }).catch((err) => {
            console.error(err)
            onLogin(false);
            setError('Failed to authenticate... ')
        });
    }

    const showError = () => {
        return (error) ?
            <div className={'w-full bg-red-500 p-1 mt-4'}>
                <hr className={'border-gray-100'}/>
                <h4 className={'text-red-50 text-xl tracking-tight text-center'}>Error: {error}</h4>
                <hr className={'border-gray-100'}/>
            </div> :
            <div/>
    }

    const loginForm = () => {
        const input_style = "w-1/2 bg-gray-50 p-2 text-gray-700 border border-gray-300 rounded-md shadow-md";
        return (
            <div className={'flex-col p-1 mt-1'}>
                <div className="flex w-full justify-center items-center m-1">
                    <input className={input_style}
                           type="text" placeholder="Username"
                           value={username}
                           onChange={(evt) => setUsername(evt.target.value)}
                           autoFocus=""/>
                </div>
                <div className="flex w-full justify-center items-center m-1">
                    <input className={input_style}
                           type="password" placeholder={"******"}
                           value={password}
                           onChange={(evt) => setPassword(evt.target.value)}/>
                </div>
                <div className="flex w-full justify-center items-center mt-4">
                    <button className="w-1/3 p-2 rounded-xl bg-indigo-700 text-indigo-100 text-xl"
                            onClick={() => {
                                console.log("Will be submitting form with ", username, password)
                                authenticate();
                            }}>
                        Login
                    </button>
                </div>
                {showError()}
            </div>
        );
    }
    const loginPage = () => {
        return (
            <div className={'flex max-h-screen max-w-full py-28 mx-10 my-1 bg-orange-100'}>
                <div className={'flex-col w-full p-10 m-2 '}>
                    <p className={'text-orange-500 text-5xl text-center font-light tracking-tight mb-4'}>
                        NTER Analytics Login
                    </p>
                    <hr className={'text-gray-100 border-1 my-2'}/>
                    <div className="flex w-full m-2 p-2 justify-center items-center">
                        <img src={logo} alt={'logo'}></img>
                    </div>
                    <p className={'text-xl tracking-tight text-gray-400 text-center my-3'}>
                        Please enter your username and password
                    </p>
                    {loginForm()}
                </div>
            </div>
        )
    }

    return loginPage();
}

export {LoginAppTUI}
