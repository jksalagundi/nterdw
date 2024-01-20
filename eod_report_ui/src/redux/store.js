import { configureStore} from "@reduxjs/toolkit";
import masterReducer from "./mastersSlice";

export default configureStore({
    reducer: {
        masters: masterReducer,
    },
});
