import {LoginAppTUI} from "./features/login/LoginAppTUI";
import React, {useState} from "react";
import {Dashboard} from "./features/dashboard/DashboardApp";
import './tailwind.css';
import store from "./redux/store";
import {Provider} from "react-redux";

const App = () => {
    const [isLogged, setIsLogged] = useState(false);
    return (
        <Provider store={store}>
            <div>
                {(isLogged) ? <Dashboard onLogin={setIsLogged}/> : <LoginAppTUI onLogin={setIsLogged}/>}
            </div>
        </Provider>
    );
}

export default App;
