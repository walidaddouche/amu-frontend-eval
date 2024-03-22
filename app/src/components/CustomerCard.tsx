import React from 'react';
import {Card, CardContent, Typography, CardActions, Button, Grid, Avatar, Tooltip, IconButton} from '@mui/material';
import {Customer} from "../utils/type";
import {Link, useNavigate} from "react-router-dom";
import {lightBlue} from "@mui/material/colors";

const CustomerCard: React.FC<Customer> = ({id, name, email}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/${id}`);
    };


    return (
            <Grid onClick={handleClick}
                container
                sx={{
                    border: '1px solid #ccc',
                    padding: 1,
                    marginBottom: 1,
                    backgroundColor: 'white',
                }}
            >
                <Grid item xs={1} >
                    <Avatar style={{ backgroundColor: lightBlue[200] }}>
                        {(name[0] + name[1]).toUpperCase()}
                    </Avatar>
                </Grid>
                <Grid item xs={11}  >
                    <Tooltip title={name}>
                        <Typography
                            color="#2F5597"
                            fontFamily="Calibri"
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%',
                            }}
                        >
                            {name}
                        </Typography>
                    </Tooltip>
                    <Tooltip title={email}>
                        <Typography
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '100%',
                                fontVariant: 'body',
                            }}
                        >
                            {email}
                        </Typography>
                    </Tooltip>
                </Grid>

            </Grid>
    );
};

export default CustomerCard;