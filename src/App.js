import React from 'react'
import {
    BrowserRouter as Router,  Switch, Route, Link
  } from "react-router-dom"

import Home from "./pages/Home"
import ConsultaProducto from "./components/ConsultaProducto"
import ConsultaPedidoCliente from "./components/ConsultaPedidoCliente"
import ConsultaPedidoProveedor from "./components/ConsultaPedidoProveedor"
import ABMProducto from "./components/ABMProducto"
import ABMPedidoCliente from './components/ABMPedidoCliente'
import ABMPedidoProveedor from './components/ABMPedidoProveedor'
import ConsultaCiclos from './components/ConsultaCiclos'
import BalanceCiclo from './components/BalanceCiclo'
import ConsultaBalance from './components/ConsultaBalance'

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
                <Link style={padding} to="/pedidos/cliente">Pedidos Clientes</Link>
                <Link style={padding} to="/pedidos/proveedor">Pedidos Proveedor</Link>
                <Link style={padding} to="/ciclos">Ciclos</Link>
                <Link style={padding} to="/balance">Balance</Link>
            </div>
   
            <Switch>
               {/* PRINCIPALES */}
                <Route path="/productos" exact={true}>
                    <ConsultaProducto/>
                </Route>
   
                <Route path="/pedidos/cliente" exact={true}>
                    <ConsultaPedidoCliente/>

                </Route>

                <Route path="/pedidos/proveedor" exact={true}>
                    <ConsultaPedidoProveedor/>

                </Route>
   
                <Route path="/ciclos" exact={true}>
                    <ConsultaCiclos/>

                </Route>
                
                <Route path="/balance" exact={true}>
                    <ConsultaBalance />

                </Route>
   
                <Route path="/" exact={true}>
                    <Home/>
                </Route>

                {/* PRODUCTO */}
                <Route path="/productos/agregar">
                    <ABMProducto tipoOperacion="ALTA"/>
                </Route>
                <Route path="/productos/eliminar">
                    <ABMProducto tipoOperacion="BAJA"/>
                </Route>
                <Route path="/productos/editar">
                    <ABMProducto tipoOperacion="MODIFICACION"/>
                </Route>

                {/* PEDIDO CLIENTE */}
                <Route path="/pedidos/cliente/agregar">
                    <ABMPedidoCliente/>
                </Route>

                {/* PEDIDO PROVEEDOR */}
                <Route path="/pedidos/proveedor/agregar">
                    <ABMPedidoProveedor/>
                </Route>

                {/* BALANCE CICLO */}
                <Route path="/ciclos/balance">
                    <BalanceCiclo />
                </Route>

            </Switch>
        </Router>
    )
}
export default App;