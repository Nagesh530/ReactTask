import { useParams } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';

export default function CreateOrderNew() {
    const { productId } = useParams<{ productId: string }>();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();        
    };
    return (
        <Box maxWidth={400} margin="auto">
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Product ID"
                    value={productId}
                    disabled
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Quantity"
                    type="number"
                    fullWidth
                    margin="normal"
                // Add any additional props or validations you need
                />
                <TextField
                    label="Shipping Address"
                    multiline
                    fullWidth
                    margin="normal"
                // Add any additional props or validations you need
                />
                <Button type="submit" variant="contained" color="primary">
                    Place Order
                </Button>
            </form>
        </Box>
    );
}
