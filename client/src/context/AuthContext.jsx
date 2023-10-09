import {createContext, useState, use, useContext, useEffect } from 'react'
import {registerRequest, loginRequest, verifyTokenRequest, profileRequest} from '../api/auth'
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';


export const AuthContext = createContext();
export const useAuth = () =>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}


export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    
   const signup = async (user) => {
    try {
     const res = await registerRequest(user);
     console.log(res.data);
     setUser(user);
     setIsAuthenticated(true);
    } catch (error) {
         setErrors(error.response.data)
    }
}

   const profile = async (user) => {
       try {
        const res = await profileRequest(user);
        
        setIsAuthenticated(true);
        setUser(res.data);
       } catch (error) {
            setErrors(error.response.data)
       }
   }

   const signin = async (user) => {
       try {
        const res = await loginRequest(user)
        setIsAuthenticated(true);
        setUser(user);
        
        
       } catch (error) {
        if(Array.isArray(error.response.data))  {
            return  setErrors(error.response.data)
        }
        setErrors([error.response.data.message])
       }
   }
   const logout = () =>{
       Cookies.remove("token");
       setIsAuthenticated(false);
       setUser(null)
   }

   useEffect(()=> {
      async function checkLogin(){
            const cookies = Cookies.get()

            if(!cookies.token){
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
               try {
                const res = await verifyTokenRequest(cookies.token);
                if(!res.data){
                    return setIsAuthenticated(false)
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);

               } catch (error) {
                   setIsAuthenticated(false);
                   setUser(null);
                   setLoading(false);
               }
            }
             checkLogin();
   },[]);

    return(
        <AuthContext.Provider value={{
            signup,
            signin,
            loading,
            logout,
            user,
            isAuthenticated,
            errors,
            profile,
        }}>
            {children}
        </AuthContext.Provider>
    )
}