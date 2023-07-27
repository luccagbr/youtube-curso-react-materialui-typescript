import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { AuthService } from "../shared/services/api/auth/AuthService";

interface IAuthContextData {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<string | void>
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = "APP_ACCESS_TOKEN"

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [ acessToken, setAccessToken ] = useState<string>();

    useEffect(() => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);

        if(accessToken) {
            setAccessToken(JSON.parse(accessToken));
        } else {
            setAccessToken(undefined);
        }
    }, [])

    const handleLogin = useCallback(async (email: string, password: string) => {
        const result = await AuthService.auth(email, password);

        if(result instanceof Error) {
            return result.message;
        } else {
            setAccessToken(result.accessToken);
            localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, JSON.stringify(result.accessToken))
        }
    }, []);

    const handleLogout = useCallback(() => {
        setAccessToken(undefined);
        localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    }, [])

    const isAuthenticated = useMemo(() => !!acessToken, [acessToken])

    return (
        <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);