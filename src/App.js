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
import "./App.css"
import ABMCiclos from './components/ABMCiclos'
import ABMCuota from './components/ABMCuota'

const App = () => {
       
      //guarda con el router que si le pones el home primero
      //no te renderiza el resto porque funciona como un switch
      //algo asi despues leo
    return (
        <Router>
        <div className="RouterContainer">
            <div className="LimiteSuperior">
               <label></label>
            </div>
            <div className="LinksContainer">
                <div className="Link">
                    <Link to="/">Home</Link>
                </div>
                <div className="Link">
                    <Link to="/productos">Productos</Link>
                </div>
                <div className="Link">
                    <Link to="/pedidos/cliente">Pedidos Clientes</Link>
                </div>
                <div className="Link">
                    <Link to="/pedidos/proveedor">Pedidos Proveedor</Link>
                </div>
                <div className="Link">
                    <Link to="/ciclos">Ciclos</Link>
                </div>
                <div className="Link">
                    <Link to="/balance">Balance</Link>
                </div>
            </div>
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

                {/* CICLO */}
                <Route path="/ciclos/agregar">
                    <ABMCiclos tipoOperacion="ALTA"/>
                </Route>
                <Route path="/ciclos/eliminar">
                    <ABMCiclos tipoOperacion="BAJA"/>
                </Route>
                <Route path="/ciclos/editar">
                    <ABMCiclos tipoOperacion="MODIFICACION"/>
                </Route>

                {/* CUOTA */}
                <Route path="/pedidos/cliente/cuota">
                    <ABMCuota tipoOperacion="ALTA"/>
                </Route>


            </Switch>
        </Router>
    )
}
export default App;