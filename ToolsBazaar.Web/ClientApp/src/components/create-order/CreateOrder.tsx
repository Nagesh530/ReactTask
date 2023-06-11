import { useParams } from 'react-router-dom';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
type FetchDataProduct = {
    id: string;
    name: string;
    price: number;
};

export default function CreateOrder() {
    const navigate = useNavigate();

    const { productId } = useParams<{ productId: string }>();
    const [currentProductId, setCurrentProductId] = useState('');
    const [currentQuantity, setcurrentQuantity] = useState('0');
    const [products, setProducts] = useState<FetchDataProduct[]>([]);

console.log(products);
    const handleSubmit = async () => {
       // event.preventDefault();

        try {
            const response = await fetch('http://localhost:5127/Order/CreateOrder', {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId: currentProductId, quantity: currentQuantity })
            });

            if (response.ok) {
                console.log('get request successful');
                navigate('/order-success');
               
            } else {
                console.error('get request failed');            
            }
        } catch (error) {
            console.error('Error making POST request:', error);
        }
    };
    const handleChange = (event: SelectChangeEvent<string>) => {
        setCurrentProductId(event.target.value);
    };
    const quantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setcurrentQuantity(event.target.value);
    };
    useEffect(() => {
        populateProductData();
        setCurrentProductId(productId ?? '');
    }, [productId]);
    const populateProductData = async () => {
        try {
            const response = await fetch('http://localhost:5127/products');
            const data = await response.json();
            setProducts(data);
            console.log(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
   

    return (
        <Box maxWidth={400} margin="auto">
            <form onSubmit={handleSubmit}>


                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Product</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentProductId}
                        label="Product"
                        onChange={handleChange}
                    >
                        {products.map((product) => (
                            <MenuItem key={product.id} value={product.id}>
                                {product.name}
                            </MenuItem>
                        ))}


                    </Select>
                </FormControl>

                <TextField label="" value={currentQuantity} fullWidth margin="normal" onChange={quantityChange} />
                <TextField label="" disabled fullWidth margin="normal" />
                <Button type="submit" variant="contained" color="primary" >
                    Place Order
                </Button>



            </form>
        </Box>
    );
}
