import React from 'react'
import HomeDeudores from '../components/HomeDeudores'
import HomeDiasRestantes from '../components/HomeDiasRestantes'

const Home = () => {
    const test_style = {
        border: "2px solid #4ed9b6",
        backgroundColor: "#4ed9b6",  
        borderRadius: "10px",
        width: "100%"
                    
        
    }
    return (
        <div class="row" style={{padding:"10px"}}>
            <div class="col-md-5" style={test_style}><HomeDeudores /></div>
            <div class="col-md-5 offset-md-2" style={test_style}><HomeDiasRestantes /></div>
        </div>
    )
}
export default Home;