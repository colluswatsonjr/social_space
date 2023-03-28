import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

import { Grid, Box } from '@mui/material';

const LoginRegister = () => {
    const [haveAccount, setHaveAccount] = useState(true)
    return (
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Welcome to Social Space...</h1>
            <Grid item>
                {haveAccount ?
                    <>
                        <LoginForm />
                        Don't have an account? &nbsp;
                        <button onClick={() => setHaveAccount(false)}>
                            Sign Up
                        </button>
                    </>
                    :
                    <>
                        <RegisterForm />
                        Already have an account? &nbsp;
                        <button onClick={() => setHaveAccount(true)}>
                            Log In
                        </button>
                    </>
                }
            </Grid>
        </Box>

    );
}

export default LoginRegister;