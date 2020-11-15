import React from 'react'
import HomeDeudores from '../components/HomeDeudores'
import HomeDiasRestantes from '../components/HomeDiasRestantes'
import "../components/css/Home.css"

const Home = () => {

    return (
        <div className ="Home">
            <div className = "HomeDeudores" ><HomeDeudores /></div>
            <div className = "HomeDiasRestantes" ><HomeDiasRestantes /></div>
        </div>
    )
}
export default Home;