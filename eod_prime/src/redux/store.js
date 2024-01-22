import { configureStore} from "@reduxjs/toolkit";
import dbMastersReducer from "./reducers/mastersSlice";
// import mastersReducer from "./playground/mastersSlice";
import formReducer from "./reducers/formSlice";


export default configureStore({
    reducer: {
        masters: dbMastersReducer,
        form: formReducer,
    },
});
