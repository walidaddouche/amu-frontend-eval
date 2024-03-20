import React from 'react';
import { Container, Typography } from '@mui/material';
import InvoiceForm from '../components/InvoiceForm';

const CreateInvoicePage: React.FC = () => {
    // Simulons un ID client pour l'exemple
    const customerId = 1;

    const handleInvoiceSubmit = (invoice: { date: string; amount: number; customerId: number }) => {
        // Ici, vous enverriez les informations de la facture à l'API
        console.log('Creating invoice:', invoice);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Créer une Facture pour le Client {customerId}
            </Typography>
            <InvoiceForm customerId={customerId} onSubmit={handleInvoiceSubmit} />
        </Container>
    );
};

export default CreateInvoicePage;
