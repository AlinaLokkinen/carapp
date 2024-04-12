import { AgGridReact } from "ag-grid-react"
import { useEffect, useState } from "react"
import { Button, Snackbar } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function CarList() {

    // states
    const [cars, setCars] = useState([{brand: '', model: ''}]);
    const [openSackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState('');

    const [colDefs, setColDefs] = useState([
        {field: 'brand', filter: true},
        {field: 'model'},
        {field: 'color'},
        {field: 'modelYear'},
        {field: 'price'},
        {cellRenderer: (params) => 
            <Button 
                size="small"
                color="info"
                onClick={() => <EditCar editCar={editCar}/>}>
                Edit
            </Button>,
            width: 120},
        {cellRenderer: (params) => 
            <Button 
                size="small"
                color="warning"
                onClick={() => deleteCar(params)}>
                Delete
            </Button>,
            width: 120}
    ]);

    // hakee autot vain ensimmäisen renderöinnin yhteydessä
    useEffect(() => getCars(), []);

    // functions:
    // getCars()
    const getCars = () => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars', {method: 'GET'})
        .then(response => {
            // console.log(response);
            if (response.ok) 
                return response.json();
            else 
                window.alert("Virhe datan hakemisessa");
        })
        .then(responsedata => {
            // console.log(responsedata._embedded.cars);
            setCars(responsedata._embedded.cars);
        })
        .catch(err => console.error(err))
    };

    // deleteCar()
    const deleteCar = (params) => {
        // console.log(params.data._links.car.href);
        const url = params.data._links.car.href;
        fetch(url, {method: 'DELETE'})
        .then(response => {
            if (response.ok) {
                setOpenSnackbar(true);
                setMsgSnackbar('Auto poistettu onnistuneesti!');
            } else {
                setOpenSnackbar(true);
            }
        })
        .catch(err => console.error(err));
    }

    const editCar = () => {

    }

    // save new car 
    const saveCar = (car) => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(car)
    })
        .then(response => getCars())
        .catch(err => console.error(err))
   };

    return (
        <>
            <AddCar saveCar={saveCar} />
            <div className="ag-theme-material" style={{width: 900, height: 500}}>
                <AgGridReact 
                    rowData={cars}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={10}>

                </AgGridReact>
                <Snackbar
                    open={openSackbar}
                    message={msgSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}>

                </Snackbar>
            </div>
        </>
    );
}