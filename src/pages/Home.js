import React from 'react'
import HomeDeudores from '../components/HomeDeudores'
import HomeDiasRestantes from '../components/HomeDiasRestantes'

const Home = () => {
    return (
        <div>
            <div>Hello!</div>
            <div><HomeDiasRestantes /></div>
            <HomeDeudores />
        </div>
    )
}
export default Home;