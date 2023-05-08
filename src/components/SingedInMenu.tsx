import Button from '@mui/material/Button';
import React from 'react';
import { useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

export default function SignedInMenu() {
    const navigate = useNavigate();
    const signOut = useSignOut();
    
    const logout = (event : any) => {
        signOut();
        navigate("account/login")
    }

    return (
            <React.Fragment>
               <Button
                    id="button"
                    color="primary"
                    variant="contained"
                    onClick={logout}
                >
                    Deconectare
                </Button>
            </React.Fragment>
      );
}

