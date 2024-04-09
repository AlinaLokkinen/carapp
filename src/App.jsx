// import './App.css'

import { AppBar, Toolbar, Typography } from "@mui/material"
import CarList from "./Components/CarList"

function App() {
  

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">CarApp</Typography>
        </Toolbar>
      </AppBar>
      <CarList />
    </>
  )
}

export default App
