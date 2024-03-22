import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    Avatar,
    Button,
    capitalize,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    Tooltip,
    Typography
} from '@mui/material';
import InvoiceTable from '../components/InvoiceTable';
import { fetchClientDetails, fetchInvoicesForCustomer } from '../utils/api/api';
import { lightBlue } from "@mui/material/colors";

const CustomerDetailsPage: React.FC = () => {
    const [customerDetails, setCustomerDetails] = useState<any>();
    const [invoices, setInvoices] = useState<any[]>([]);
    const [idError, setIdError] = useState(false);
    const [fetchError, setFetchError] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const customerId = params.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const details = await fetchClientDetails(Number(customerId));
                setCustomerDetails(details);

                const customerInvoices = await fetchInvoicesForCustomer(Number(customerId));
                setInvoices(customerInvoices);
            } catch (error) {

                    setIdError(true); // ID client invalide
                    setFetchError(true); // Erreur de récupération des détails du client

            }
        };

        if (customerId) {
            fetchData();
        }
    }, [customerId]);

    if (!customerDetails) {
        return <CircularProgress />;
    }

    if (idError) {
        return <Typography variant="body1">Veuillez saisir un ID valide.</Typography>;
    }

    if (fetchError) {
        return <Typography variant="body1">Erreur lors de la récupération des détails du client.</Typography>;
    }

    const toHomePage = () => {
        navigate('/');
    };

    const toCreateInvoice = () => {
        navigate(`/customer/${customerId}/invoices/add`);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Fiche de {customerDetails.name}
            </Typography>
            <Typography variant="h5" gutterBottom>
                {capitalize(customerDetails.email)}
            </Typography>

            <Button onClick={toCreateInvoice}>Créer une facture</Button>
            <Button onClick={toHomePage}>Retour aux clients</Button>

            {invoices.length > 0 ? (
                <>
                    <Typography>Factures</Typography>
                    <InvoiceTable invoices={invoices} />
                </>
            ) : (
                <Typography variant="subtitle1" gutterBottom>
                    Aucune facture disponible pour ce client.
                </Typography>
            )}
        </Container>
    );
};

export default CustomerDetailsPage;
