import { configureStore} from "@reduxjs/toolkit";
import dbMastersReducer from "./reducers/mastersSlice";
import mastersReducer from "./playground/mastersSlice";


export default configureStore({
    reducer: {
        db_masters: dbMastersReducer,
        masters: mastersReducer,
    },
});
