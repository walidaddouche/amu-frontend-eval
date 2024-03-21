import React from 'react';
import { Container } from '@mui/material';
import CustomerForm from '../components/CustomerForm';


const CreateCustomerPage: React.FC = () => {
    return (
        <Container>
            <CustomerForm />
        </Container>
    );
};

export default CreateCustomerPage;
