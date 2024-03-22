import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableSortLabel, Typography } from '@mui/material';
import { Invoice } from "../utils/type";

interface InvoiceTableProps {
    invoices: Invoice[];
}

const getStatusStyle = (status: string) => {
    switch (status) {
        case 'SENT':
            return { color: 'orange' };
        case 'PAID':
            return { color: 'green' };
        default:
            return {};
    }
};
const formatDate = (date: string | undefined): string => {
    return date ? new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }) : 'Date inconnue';
};



const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices }) => {
    const [sortBy, setSortBy] = useState<keyof Invoice | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (field: keyof Invoice) => {
        const isAsc = sortBy === field && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortBy(field);
    };

    const sortedInvoices = invoices.sort((a, b) => {
        if (!sortBy) return 0;

        let valueA = a[sortBy];
        let valueB = b[sortBy];

        if (typeof valueA === 'string') {
            valueA = valueA.toLowerCase();
            valueB = (valueB as string).toLowerCase();
        }
        if(valueA && valueB) {
            if (valueA < valueB) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortOrder === 'asc' ? 1 : -1;
            }
        }
        return 0;
    });


    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === 'due_date'}
                                direction={sortBy === 'due_date' ? sortOrder : 'asc'}
                                onClick={() => handleSort('due_date')}
                            >
                                Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === 'amount'}
                                direction={sortBy === 'amount' ? sortOrder : 'asc'}
                                onClick={() => handleSort('amount')}
                            >
                                Montant
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === 'status'}
                                direction={sortBy === 'status' ? sortOrder : 'asc'}
                                onClick={() => handleSort('status')}
                            >
                                Statut
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell>
                                {formatDate(invoice.due_date)}
                            </TableCell>

                            <TableCell>{invoice.amount} €</TableCell>
                            <TableCell>
                                <Typography style={getStatusStyle(invoice.status)}>
                                    {invoice.status}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};
export default InvoiceTable;
