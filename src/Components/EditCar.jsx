import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function EditCar(props) {

    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '', 
        model: '', 
        color: '', 
        modelYear: '', 
        price: ''
    });

    const handleClickOpen = () => {
        
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        setCar({...car, [e.target.name]: e.target.value});
    };

    const addCar = () => {
        props.saveCar(car);
        handleClose();
    };

    return (
        <>
            <Button variant="text" onClick={handleClickOpen}>
                Edit car
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const email = formJson.email;
                    console.log(email);
                    handleClose();
                    },
                }}
            >
            <DialogTitle>New Car</DialogTitle>

            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="brand"
                    value={car.brand}
                    onChange={e => handleInputChange(e)}
                    label="Brand"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="model"
                    value={car.model}
                    onChange={e => handleInputChange(e)}
                    label="Model"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="color"
                    value={car.color}
                    onChange={e => handleInputChange(e)}
                    label="Color"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="modelYear"
                    value={car.modelYear}
                    onChange={e => handleInputChange(e)}
                    label="Model Year"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="price"
                    value={car.price}
                    onChange={e => handleInputChange(e)}
                    label="Price"
                    fullWidth
                    variant="standard"
                />
                
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addCar}>Save</Button>
            </DialogActions>

            </Dialog>
        </>
    );

}