import React from 'react'
import {
    BrowserRouter as Router,  Switch, Route, Link
  } from "react-router-dom"

import Home from "./pages/Home"
import ConsultaProducto from "./components/ConsultaProducto"

const App = () => {
    const padding = {
        padding: 5
      }
    
      //guarda con el router que si le pones el home primero
      //no te renderiza el resto porque funciona como un switch
      //algo asi despues leo
    return (
        <Router>
            <div>
                <Link style={padding} to="/">Home</Link> 
                <Link style={padding} to="/productos">Productos</Link>
            </div>
   
            <Switch>
                
                <Route path="/productos">
                    <ConsultaProducto/>
                </Route>
   
                <Route path="/">
                    <Home/>
                </Route>

            </Switch>
        </Router>
    )
}
export default App;