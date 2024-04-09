import { AgGridReact } from "ag-grid-react"
import { useEffect, useState } from "react"
import { Button, Snackbar } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css";

export default function CarList() {

    // states
    const [cars, setCars] = useState([{brand: '', model: ''}]);
    const [openSackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState('');

    const [colDefs, setColDefs] = useState([
        {field: 'brand'},
        {field: 'model'},
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
            if (response.ok)
                setOpenSnackbar(true);
            // viesti
            else 
            setOpenSnackbar(true);
            })
        .catch(err => console.error(err));
    }

    return (
        <>
            <div className="ag-theme-material" style={{width: 700, height: 500}}>
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