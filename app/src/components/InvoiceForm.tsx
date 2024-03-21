import React, {useState} from 'react';
import {Button, TextField, Container, Typography, Snackbar, Alert, MenuItem, Select} from '@mui/material';
import {useNavigate} from 'react-router-dom';

import {createInvoice} from "../utils/api/api";

interface InvoiceFormProps {
    customerId: number;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({customerId}) => {
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState<string>(today);
    const [amount, setAmount] = useState<number | ''>('');
    const [status, setStatus] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (date && amount && status) {
            try {
                const invoice = {
                    client_id: customerId,
                    amount: typeof amount === 'number' ? amount : parseFloat(amount),
                    due_date: date,
                    status
                };

                await createInvoice(invoice);
                setSnackbarMessage('Facture créée avec succès!');
                setSnackbarOpen(true);
                setTimeout(() => {
                    navigate(`/${customerId}`);
                }, 3000);
            } catch (error) {
                setSnackbarMessage('Erreur lors de la création de la facture.');
                setSnackbarOpen(true);
            }
        }
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
                    label="Date de la facture"
                    type="date"
                    InputLabelProps={{shrink: true}}
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
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                />
                <select
                    id="status-select"
                    value={status}
                    name="status"
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option key={"SENT"} value={"SENT"} >
                        SENT
                    </option>
                    <option key={"PAID"} value={"PAID"}>
                        PAID
                    </option>

                </select>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Enregistrer la facture
                </Button>
            </form>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{width: '100%'}}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default InvoiceForm;
