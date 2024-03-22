import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createInvoice } from "../utils/api/api";

interface InvoiceFormProps {
    customerId: number;
    fullName: string;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ customerId, fullName }) => {
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState<string>(today);
    const [amount, setAmount] = useState<number | ''>('');
    const [status, setStatus] = useState('SENT');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [validCustomerId, setValidCustomerId] = useState<boolean>(true); // Variable pour vérifier la validité de l'ID du client
    const navigate = useNavigate();

    // Vérifier la validité de l'ID du client au chargement initial
    useEffect(() => {
        if (isNaN(customerId)) {
            setValidCustomerId(false);
        }
    }, [customerId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validCustomerId) {
            return; // Sortir de la fonction si l'ID du client n'est pas valide
        }

        if (date && amount && status) {
            try {
                const invoice = {
                    client_id: customerId,
                    amount: typeof amount === 'number' ? amount : parseFloat(amount),
                    due_date: date,
                    status
                };

                await createInvoice(invoice);
                setSnackbarMessage(`Facture créée avec succès pour ${fullName}! Redirection vers la page d'accueil.`);
                setSnackbarOpen(true);
                setTimeout(() => {
                    navigate(`/${customerId}`);
                }, 3000);
            } catch (error) {
                setValidCustomerId(false);
                setSnackbarMessage('Une erreur est survenue lors de la création de la facture.');
                setSnackbarOpen(true);
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            {!validCustomerId && (
                <div style={{ marginBottom: '20px' }}>
                    <Alert severity="error">ID client invalide. Veuillez fournir un ID valide.</Alert>
                </div>
            )}
            <Typography component="h1" variant="h5">
                Nouvelle Facture
            </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Client"
                value={fullName}
                InputProps={{
                    readOnly: true,
                    tabIndex: -1,
                }}
            />
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Date de la facture"
                    type="date"
                    InputLabelProps={{ shrink: true }}
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
                    style={{
                        width: '100%',
                        marginBottom: '20px',
                        padding: '10px',
                        border: '1px solid #bdbdbd',
                        borderRadius: '4px',
                        fontSize: '16px',
                        cursor: 'pointer'
                    }}
                    id="status-select"
                    value={status}
                    name="status"
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option key={"SENT"} value={"SENT"}>
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
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default InvoiceForm;
