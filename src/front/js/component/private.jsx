import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const token = store.token || localStorage.getItem("token");

        // Si no hay token, redirigir al login
        if (!token) {
            navigate("/login");
        }
    }, [store.token, navigate]);

    return (
        <div>
            <h1>Private Page</h1>
            <p>This content is only accessible to authenticated users.</p>
        </div>
    );
};

