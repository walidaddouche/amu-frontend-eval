import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';

interface Customer {
    name?: string;
    email?: string;
}

interface CustomerFormProps {
    onSubmit: (customer: Customer) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ name, email });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
                Client
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Nom"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
        </Container>
    );
};

export default CustomerForm;
