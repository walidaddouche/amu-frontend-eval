import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
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
        <Container>
            <Typography variant="h4" gutterBottom>
                Liste des Clients
            </Typography>
            {loading ? (
                <Typography>Chargement...</Typography>
            ) : (
                clients.map((client) => (
                    <CustomerCard
                        key={client.id}
                        id={client.id}
                        name={client.name}
                        email={client.email}
                    />
                ))
            )}
        </Container>
    );
};

export default CustomersPage;
