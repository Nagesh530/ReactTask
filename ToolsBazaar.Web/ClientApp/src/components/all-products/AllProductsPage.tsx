import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

type FetchDataProduct = {
    id: number;
    name: string;
    price: number;
};


const AllProductsPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<FetchDataProduct[]>([]);
   
    useEffect(() => {
        populateProductData();
    }, []);

    const renderProductsTable = (products: FetchDataProduct[]) => {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="products table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Create order </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell align="left">{product.name}</TableCell>
                                <TableCell align="right">
                                    ${(product.price.toFixed(2))}
                                </TableCell>
                                <TableCell align="center">
                                    <Link to={`/create-order/${product.id}`}>
                                        <ShoppingCartCheckoutIcon />
                                    </Link>
                                </TableCell>

                               
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    const populateProductData = async () => {
        try {
            const response = await fetch('http://localhost:5127/products');
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const contents = loading ? (
        <CircularProgress size={24} />
    ) : (
        renderProductsTable(products)
    );

    return (
        <Stack spacing={4}>
            <Typography variant="h2">All products</Typography>
            {contents}
        </Stack>
    );
};

export default AllProductsPage;