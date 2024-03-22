import React, { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import InvoiceForm from "../components/InvoiceForm";
import { useParams } from "react-router-dom";
import { fetchClientFullName } from "../utils/api/api";

const CreateInvoicePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const customerIdNumber = id ? parseInt(id, 10) : null;
    const [name, setName] = useState(""); // Initialiser le state avec le type correct

    useEffect(() => {
        const fetchFullName = async () => {
            try {
                if (customerIdNumber) {
                    const object = await fetchClientFullName(customerIdNumber);
                    // @ts-ignore
                    setName(object.name);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des détails du client:", error);
            }
        };

        fetchFullName();
    }, [id]);
    return (
        <Container>
            {customerIdNumber && <InvoiceForm customerId={customerIdNumber}  fullName={name} />}
        </Container>
    );
};

export default CreateInvoicePage;
