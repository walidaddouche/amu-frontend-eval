import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {createClient} from "../utils/api/api";

interface CustomerFormProps {}

const CustomerForm: React.FC<CustomerFormProps> = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        setNameError('');
        setEmailError('');

        if (!name) {
            setNameError('Le nom est requis.');
            isValid = false;
        }

        if (!email) {
            setEmailError('L’email est requis.');
            isValid = false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setEmailError('L’email n’est pas valide.');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await createClient({ name, email });
            setSnackbarMessage('Client créé avec succès !');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error: any) {
            if (error?.status === 409) {
                setSnackbarMessage('Cette adresse e-mail est déjà utilisée.');
                setSnackbarSeverity('error');
            } else {
                setSnackbarMessage('Une erreur est survenue.');
                setSnackbarSeverity('error');
            }
            setSnackbarOpen(true);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
                Ajouter un Client
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    name="fullName"
                    fullWidth
                    label="Nom"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!nameError}
                    helperText={nameError}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!emailError}
                    helperText={emailError}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Enregistrer
                </Button>
            </form>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CustomerForm;
