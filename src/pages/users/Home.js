import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../img/logo.jpeg'

const home = () => {
  return (
    <div className="hero">
      <nav>
        <h2>Bienvenido</h2>
        <div className="menu">
          <button><Link to='/signup'>Registrate</Link></button>
          <button><Link to='/login'>Inicia Sesión</Link></button>
        </div>
      </nav>
      <img src={logo} alt="" style={{ width: '100%'}} />
    </div>
  )
}

export default home