import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Logout = () => {
    const { actions } = useContext(Context);

    return (
        <button type="button" className="btn btn-primary w-100" onClick={actions.logout}>
            Logout
        </button>
    );
};
