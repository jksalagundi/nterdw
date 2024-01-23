import { configureStore} from "@reduxjs/toolkit";
import dbMastersReducer from "./reducers/mastersSlice";
import formReducer from "./reducers/formSlice";
import eodReportReducer from "./reducers/eodReportSlice";

export default configureStore({
    reducer: {
        masters: dbMastersReducer,
        form: formReducer,
        eod: eodReportReducer,
    },
});
