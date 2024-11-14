import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({
    redirectTo = "/",
    children,
}) => {
    const isAllowed = useSelector((state) => state.login.idUsuario);
    const [isLoading, setIsLoading] = useState(true);
    console.log(isAllowed)
    useEffect(() => {
        // Verifica si isAllowed ha cambiado de null a un valor definitivo
        if (isAllowed !== null) {
            setIsLoading(false);
        }
    }, [isAllowed])
    if (isLoading) {
        return <div>Cargando...</div>;
    }
    if (isAllowed == 0) {
        return <Navigate to={redirectTo} replace />;
    }

    return children ? children : <Outlet />;
};

export const ProtectedRouteRol = ({
    redirectTo = "/",
    children,
}) => {
    const isAllowed = useSelector((state) => state.login.idRol);
    const [isLoading, setIsLoading] = useState(true);
    console.log(isAllowed)
    useEffect(() => {
        // Verifica si isAllowed ha cambiado de null a un valor definitivo
        if (isAllowed !== null) {
            setIsLoading(false);
        }
    }, [isAllowed])
    if (isLoading) {
        return <div>Cargando...</div>;
    }
    if (isAllowed == 2) {
        return <Navigate to={redirectTo} replace />;
    }

    return children ? children : <Outlet />;
};

export const ProtectedRouteLogin = ({
    redirectTo = "/",
    children,
}) => {
    const isAllowed = useSelector((state) => state.login.idUsuario);
    const [isLoading, setIsLoading] = useState(true);
    console.log(isAllowed)
    useEffect(() => {
        // Verifica si isAllowed ha cambiado de null a un valor definitivo
        if (isAllowed !== null) {
            setIsLoading(false);
        }
    }, [isAllowed])
    if (isLoading) {
        return <div>Cargando...</div>;
    }
    if (isAllowed != 0) {
        return <Navigate to={redirectTo} replace />;
    }

    return children ? children : <Outlet />;
};