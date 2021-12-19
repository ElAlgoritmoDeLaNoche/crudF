import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit'

export default function DashboardAdmin() {

  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError('')
    try {
      await logout()
      history.push('/')
    } catch {
      setError('Hubo un fallo al salir')
    }
  }

  return (
    <div className="hero">
      <nav>
        <h2>Bienvenido Admin {currentUser.email}</h2>
        <div className="menu">
          <button><Link to='/update-profile'>Perfil</Link></button>
          <button onClick={handleLogout}>Salir</button>
        </div>
      </nav>
      {error && <h1>{error}</h1>}

    <MDBContainer style={{ marginTop: '30px' }}>
      <MDBRow>
        <MDBCol md="6">
        <Link to="/add-admin">
          <MDBBtn style={{ marginBottom: '15px' }}>Add Admin</MDBBtn>
        </Link>
        </MDBCol>
        <MDBCol md="6">
        <Link to="/add-commerce">
          <MDBBtn style={{ marginBottom: '15px' }}>Add Commerce</MDBBtn>
        </Link>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  )
}
