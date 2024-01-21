import { configureStore} from "@reduxjs/toolkit";
import mastersReducer from "./mastersSlice";

export default configureStore({
    reducer: {
        masters: mastersReducer,
    },
});
