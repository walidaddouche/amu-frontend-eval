import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';

interface InvoiceFormProps {
    customerId: number;
    onSubmit: (invoice: { date: string; amount: number; customerId: number }) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ customerId, onSubmit }) => {
    const [date, setDate] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ date, amount, customerId });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
                Nouvelle Facture
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Montant"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Ajouter Facture
                </Button>
            </form>
        </Container>
    );
};

export default InvoiceForm;
