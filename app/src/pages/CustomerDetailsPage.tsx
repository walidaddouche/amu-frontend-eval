import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Container, Typography} from '@mui/material';
import InvoiceTable from '../components/InvoiceTable';
import {fetchClientDetails, fetchInvoicesForCustomer} from "../utils/api/api";


const CustomerDetailsPage: React.FC = () => {
    const [customerDetails, setCustomerDetails] = useState<any>();
    const [invoices, setInvoices] = useState<any[]>([]);
    const navigate = useNavigate();
    const params = useParams();

    const  customerId  = params.id;

    useEffect(() => {
        const getCustomerDetails = async () => {
            try {
                const details = await fetchClientDetails(Number(customerId));
                setCustomerDetails(details);

            } catch (error) {
                console.error("Erreur lors de la récupération des détails du client:", error);
            }
        };

        const getInvoices = async () => {
            try {
                const customerInvoices = await fetchInvoicesForCustomer(Number(customerId));
                console.log(customerInvoices);
                setInvoices(customerInvoices);
            } catch (error) {
                console.error("Erreur lors de la récupération des factures du client:", error);
            }
        };

        if (customerId) {
            getCustomerDetails();
            getInvoices();
        }
    }, [customerId]);

    if (!customerDetails) {
        return <div>Chargement des détails du client{customerId}</div>;
    }

    const toHomePage = () => {
        navigate('/');
    };


    const toCreateInvoice = () => {
        navigate("/customer/"+customerId+"/invoices/add");
    };



    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Détails du Client {customerDetails.name} {customerDetails.email}
            </Typography>
            <Button onClick={toCreateInvoice}> Créer une factures</Button>
            <Button onClick={toHomePage}> Retour aux clients</Button>
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
