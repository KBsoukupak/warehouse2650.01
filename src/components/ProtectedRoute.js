import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import {Alert} from "react-bootstrap";


export function ProtectedRoute({children}) {
    const {user, loading} = useAuth();

    if (loading) return <Alert variant={"primary"} className="m-auto text-center">
        Stránka se načítá, prosím čekejte...
    </Alert>;
    if (!user) return <Navigate to='/login' />

    return<>{ children }</>
};