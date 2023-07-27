import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material"
import { useAuthContext } from "../../../contexts";
import { useState } from "react";
import * as yup from "yup";

interface ILoginProps {
    children: React.ReactNode;
}

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(5)
})

export const Login: React.FC<ILoginProps> = ({ children }) => {
    const { isAuthenticated, login } = useAuthContext();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);

    const [ emailError, setEmailError ] = useState("");
    const [ passwordError, setPasswordError ] = useState("");

    const handleSubmit = () => {
        setIsLoading(true);

        loginSchema
        .validate({ email, password }, { abortEarly: false })
        .then(dadosValidados => {
            login(dadosValidados.email, dadosValidados.password)
            .then(() => {
                setIsLoading(false);
            })
        })
        .catch((errors: yup.ValidationError) => {
            setIsLoading(false);
            errors.inner.forEach(error => {
                if(error.path === "email") {
                    setEmailError(error.message)
                } else if(error.path === "password") {
                    setPasswordError(error.message)
                }
            })
        })
    }

    if(isAuthenticated) return ( 
        <>{children}</>
    )

    return (
        <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
            <Card>
                <CardContent>
                    <Box display="flex" flexDirection="column" gap={2} width="250px">
                        <Typography variant="h6" align="center">Login</Typography>

                        <TextField 
                            fullWidth
                            label="E-mail"
                            error={!!emailError}
                            helperText={emailError}
                            type="email"
                            disabled={isLoading}
                            value={email}
                            onKeyDown={() => setEmailError("")}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            label="Senha"
                            value={password}
                            helperText={passwordError}
                            disabled={isLoading}
                            onKeyDown={() => setPasswordError("")}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!passwordError}
                            type="password"
                        >

                        </TextField>
                    </Box>
                </CardContent>

                <CardActions>
                    <Box width="100%" display="flex" justifyContent="center">
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            endIcon={isLoading ? <CircularProgress variant="indeterminate" size={20} color="inherit"/> : undefined}
                            >
                            Entrar
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    )
}