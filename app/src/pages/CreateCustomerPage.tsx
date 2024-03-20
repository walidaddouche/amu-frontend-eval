import React from 'react';
import { Container } from '@mui/material';
import CustomerForm from '../components/CustomerForm';
import { Customer } from "../utils/type";
import {createClient} from "../utils/api/api";

const CreateCustomerPage: React.FC = () => {
    const handleCustomerSubmit = async (customer: Customer) => {
        try {
            const newCustomer = await createClient({ ...customer });
            console.log('Nouveau client créé:', newCustomer);
        } catch (error) {
            console.error('Erreur lors de la création du client:', error);
        }
    };

    return (
        <Container>
            <CustomerForm onSubmit={handleCustomerSubmit} />
        </Container>
    );
};

export default CreateCustomerPage;
