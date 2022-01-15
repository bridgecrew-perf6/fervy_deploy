import React, {
    useContext,
    useEffect,
    useState,
} from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import AppContext from "../contexts/AppContext";
import useAuth from '../hooks/useAuth';

/**
 * ? Segúun tengo entendido, el pedo que hay es que user.role no está asignado y 
 * ? que por eso no puede leer la propiedad includes, pero en, sí debería existir el role. xddd
 * ? k era el error xddddddddd como se arregló porque ya no me lo da
 */

 /**
  * !aquí la función getUserRoleAuthStatus tenía la propiedad user, pero daba error, le ando cambiando arre creo ue es suficiente de comment adios
  */
 
const getUserRoleAuthStatus = (pathname, user, routes) => {
    

    if (!user){
        return false
    }

    const matched = routes.find((r) => r.path?.split("/")[1] === pathname.split("/")[1]);

    const authenticated = 
        matched && matched.auth && matched.auth.length
        ? matched.auth.includes(user.role)
        : true;

    return authenticated;
};

const AuthGuard = ({ children }) => {
    const { pathname } = useLocation()
    const { routes } = useContext(AppContext);
    const {
        isAuthenticated,
        user
    } = useAuth()

    const [previouseRoute, setPreviousRoute] = useState(null)
    const [isUserRoleAuthenticated, setIsUserRoleAuthenticated] = useState(getUserRoleAuthStatus(pathname, user, routes));
    let authenticated = isAuthenticated && isUserRoleAuthenticated;


    // IF YOU NEED ROLE BASED AUTHENTICATION,
    // UNCOMMENT ABOVE TWO LINES, getUserRoleAuthStatus METHOD AND user VARIABLE
    // AND COMMENT OUT BELOW LINE
    // let authenticated = isAuthenticated

    useEffect(() => {
        if (previouseRoute !== null) setPreviousRoute(pathname)
    }, [pathname, previouseRoute])

    useEffect(() => {
        console.log({msg: "Usuario actualizado", user})
        setIsUserRoleAuthenticated(getUserRoleAuthStatus(pathname, user, routes));
    }, [user])

    if (authenticated) return <>{children}</>
    else {
        return (
            <Navigate
                to={{
                    pathname: '/session/404',
                    state: { redirectUrl: previouseRoute },
                }}
            />
        )
    }
}

export default AuthGuard
