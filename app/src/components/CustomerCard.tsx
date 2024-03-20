import React from 'react';
import {Card, CardContent, Typography, CardActions, Button} from '@mui/material';
import {Customer} from "../utils/type";
import {useNavigate} from "react-router-dom";

const CustomerCard: React.FC<Customer> = ({id, name, email}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/${id}`);
    };

    return (
        <Card variant="outlined" key={id}>
            <CardContent>
                <Typography  onClick={handleClick} variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography color="textSecondary">
                    {email}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={handleClick} size="small">Voir Détails</Button>
            </CardActions>
        </Card>
    );
};

export default CustomerCard;