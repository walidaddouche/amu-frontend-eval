import React from 'react';
import { Container } from '@mui/material';
import CustomerForm from '../components/CustomerForm';

const CreateCustomerPage: React.FC = () => {
    const handleCustomerSubmit = (customer: { name: string; email: string }) => {
        // Ici, vous enverriez les informations du client à l'API
        console.log('Creating customer:', customer);
    };

    return (
        <Container>
            <div>
                create customer page
            </div>
        </Container>
    );
};

export default CreateCustomerPage;
