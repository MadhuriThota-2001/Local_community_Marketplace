import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardMedia, CardContent, Typography, Button, Grid , AppBar} from '@mui/material';
import SellerNavBar from './SellerNavBar';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const userId = localStorage.getItem('userId')
                const response = await axios.post('http://localhost:5000/api/getTransactions', { userId}); 
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };
        fetchTransactions();
    }, []);

    const handleAction = async (transactionId, action) => {
        try {
            const response = await axios.post('http://localhost:5000/api/updateTransactions', {
                transactionId,
                action,
            });
            console.log(response)
            alert(response.data.message);
            // Update transaction status in the UI
            setTransactions((prev) =>
                prev.map((txn) =>
                    txn.id === transactionId ? { ...txn, status: action.toUpperCase() } : txn
                )
            );
        } catch (error) {
            console.error(`Error updating status to ${action}:`, error);
        }
    };

    return (
        <>
        <AppBar position="static">
            <SellerNavBar title={'Transactions'} />
        </AppBar>
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            {transactions.length > 0 ? (
                <Grid container spacing={3}>
                    {transactions.map((transaction) => (
                        <Grid item xs={12} sm={6} md={4} key={transaction.id}>
                            <Card sx={{ boxShadow: 3 }}>
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={`http://localhost:5000${transaction.product.image}`}
                                    alt={transaction.product.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {transaction.product.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        Price: ${transaction.amount/100}
                                    </Typography>
                                    <Typography variant="body1">
                                        PaymentStatus: {transaction.status}
                                    </Typography>
                                    <Typography variant="body1">
                                        Date: {transaction.paymentTimestamp}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
                                    {
                                        transaction.orderStatus !== 'REJECTED' && (
                                            <Button
                                        variant="contained"
                                        color="success"
                                        disabled={transaction.status === 'CONFIRMED'}
                                        onClick={() => handleAction(transaction.id, 'CONFIRMED')}
                                             >
                                            Confirm
                                        </Button>
                                        )
                                    }
                                    
                                    {
                                        transaction.status !== 'CONFIRMED' &&(
                                            <>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                disabled={transaction.status === 'REJECTED'}
                                                onClick={() => handleAction(transaction.id, 'REJECTED')}
                                            >
                                                Reject
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={transaction.status === 'SHIPPED'}
                                                onClick={() => handleAction(transaction.id, 'SHIPPED')}
                                            >
                                                Shipped
                                            </Button>
                                            </>
                                        )
                                    }
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="body1" align="center">
                    No transactions available.
                </Typography>
            )}
        </Box>
        </>
    );
};

export default Transactions;
