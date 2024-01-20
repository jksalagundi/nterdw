import React, {useState} from "react";
import axios from "axios";
import logo from './Nter-logo.png';

const LoginApp = ({onLogin}) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);

    const authenticate = () => {
        console.log("Now authenticating....")
        setError(null);
        axios.get('http://127.0.0.1:8000/login', {params: {username, password}})
            .then((res)=>{
                console.log('Response - ', res);
                onLogin(true);
                setError(null);
            }).catch((err)=>{
                console.error(err)
                onLogin(false);
                setError('Failed to authenticate... ')
        });
    }

    const showError = () => {
        return (error) ? <div><hr/><h4>Error: {error}</h4></div> : <div/>
    }

    const loginForm = () => {
        return (
            <div>
                <div className="field">
                    <div className="control">
                        <input className="input is-large"
                               type="text" placeholder="Username"
                               value={username}
                               onChange={(evt) => setUsername(evt.target.value)}
                               autoFocus=""/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <input className="input is-large" type="password"
                               value={password}
                               onChange={(evt) => setPassword(evt.target.value)}
                               placeholder="Password"/>
                    </div>
                </div>
                <button className="button is-block is-danger is-large is-fullwidth"
                        onClick={()=>{
                            console.log("Will be submitting form with ", username, password)
                            authenticate();
                        }}
                >Login</button>
                {showError()}
            </div>
        );
    }
    const loginPage = () => {
        return (
            <div className={'hero is-fullheight is-primary'}>
                <div className={'hero-body'}>
                    <div className={'container has-text-centered'}>
                        <div className={'column is-8 is-offset-2'}>
                            <h3 className={'title has-text-white'}>NTER Analytics Login</h3>
                            <hr className={'login-hr'}/>
                            <div className="box">
                                <div className="box">
                                    <img src={logo} alt={'logo'}></img>
                                </div>
                                <div className="title has-text-grey is-5">Please enter your username and password.</div>
                                {loginForm()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }


    return loginPage();
}

export {LoginApp}
