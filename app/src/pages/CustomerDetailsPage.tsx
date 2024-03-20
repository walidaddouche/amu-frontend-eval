import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import InvoiceTable from '../components/InvoiceTable';
import {fetchClientDetails, fetchInvoicesForCustomer} from "../utils/api/api";


const CustomerDetailsPage: React.FC = () => {
    const [customerDetails, setCustomerDetails] = useState<any>();
    const [invoices, setInvoices] = useState<any[]>([]);


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
    if(invoices.length == 0) {
        return <div>Aucune facture trouvé pour ce client</div>;

    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Détails du Client {customerDetails.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Factures
            </Typography>
            <InvoiceTable invoices={invoices} />
        </Container>
    );
};

export default CustomerDetailsPage;
