import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import CustomerDetailsPage from './pages/CustomerDetailsPage';
import CreateCustomerPage from './pages/CreateCustomerPage';
import CreateInvoicePage from './pages/CreateInvoicePage';
import CustomersPage from "./pages/CustomersPage";

const App: React.FC = () => {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Gestion de Clients et Factures
                    </Typography>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>
                        Accueil
                    </Link>
                    <Link to="/create" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Nouveau Client
                    </Link>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: '20px' }}>
                <Routes>
                    <Route path="/" element={<CustomersPage />} />
                    <Route path="/customer/:id" element={<CustomerDetailsPage />} />
                    <Route path="/create" element={<CreateCustomerPage />} />
                    <Route path="/customer/:id/invoices/create" element={<CreateInvoicePage />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
