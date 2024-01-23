import { configureStore} from "@reduxjs/toolkit";
import dbMastersReducer from "./reducers/mastersSlice";
import formReducer from "./reducers/formSlice";
import eodReducer from "./reducers/eodSlice";

export default configureStore({
    reducer: {
        masters: dbMastersReducer,
        form: formReducer,
        eod: eodReducer,
    },
});
