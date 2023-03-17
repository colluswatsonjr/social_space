import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";



const LoginRegister = () => {
    const [haveAccount, setHaveAccount] = useState(true)
    return (
        <>
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
        </>
    );
}

export default LoginRegister;