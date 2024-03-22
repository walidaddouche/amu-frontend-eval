import React, {useEffect, useState} from 'react';
import {CircularProgress, Container, Grid, LinearProgress, Typography} from '@mui/material';
import CustomerCard from '../components/CustomerCard';
import {fetchClients} from "../utils/api/api";
import {Customer} from "../utils/type";


const CustomersPage: React.FC = () => {
    const [clients, setClients] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getClients = async () => {
            setLoading(true);
            try {
                const data = await fetchClients();
                // @ts-ignore
                setClients(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des clients:", error);
            } finally {
                setLoading(false);
            }
        };

        getClients();
    }, []);

    return (
        <>
            <Typography variant="h4" gutterBottom style={{fontWeight: 'bold', marginBottom: '20px'}}>
            Liste des Clients
        </Typography>
            <Grid  xs={12} md={6}>
                {loading ? (
                    <CircularProgress aria-label="Chargement"/>) : (
                    clients.map((client) => (
                        <CustomerCard
                            key={client.id}
                            id={client.id}
                            name={client.name}
                            email={client.email}
                        />
                    ))
                )}
            </Grid>
            </>
    );
};

export default CustomersPage;