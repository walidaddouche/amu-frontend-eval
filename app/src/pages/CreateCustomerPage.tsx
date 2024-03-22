import React from 'react';
import { Container } from '@mui/material';
import CustomerForm from '../components/CustomerForm';


const CreateCustomerPage: React.FC = () => {
    return (
        <Container sx={{ display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', // Ajustez la hauteur selon vos besoins
        }}>
            <CustomerForm />
        </Container>
    );
};

export default CreateCustomerPage;
