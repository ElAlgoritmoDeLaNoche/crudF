import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { addCommerceInitiate, deleteContactInitiate, getContactsInitiate, getContactInitiate, updateCommerceInitiate, reset } from '../../redux/Actions'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTypography, MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, } from 'mdb-react-ui-kit'
import { makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Document, Page, Text, View, PDFDownloadLink } from '@react-pdf/renderer'

const initialState = {
  fullname: '',
  ownername: ''
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 70,
    margin: "auto",
    padding: "15px",
    maxWidth: "500px",
    alignContent: "center",
  }
}))

export default function AddAdmin() {

  const classes = useStyles()
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [state, setState] = useState(initialState)
  const [editMode, setEditMode] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [userId, setUserId] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const { fullname, ownername } = state;

  const dispatch = useDispatch()
  const { commerces, commerce: singleCommerce } = useSelector(state => state.data)

  useEffect(() => {
    dispatch(getContactsInitiate())
  }, [])

  useEffect(() => {
    if (singleCommerce) {
      setState({ ...singleCommerce })
    }
  }, [singleCommerce])

  const deleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      dispatch(deleteContactInitiate(id))
    }
  }

  const editContact = (id) => {
    setEditMode(true)
    setUserId(id)
    dispatch(getContactInitiate(id))
  }

  const modalBody = (
    <div className="row">
      <div className="col-sm-4">Name:</div>

      <div className="col-sm-4">Email:</div>

    </div>
  )

  const handleModal = (id) => {
    setModalOpen(true)
    dispatch(getContactInitiate(id))
  }

 

  const handleCloseModal = () => {
    setModalOpen(false)
    dispatch(reset())
  }

  const handleInputChange = (e) => {
    let { fullnamee, value } = e.target
    setState({ ...state, [fullnamee]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!fullname || !ownername ) {
      setErrorMsg('Please fill all required input field')
    } else {
      if (!editMode) {
        dispatch(addCommerceInitiate(state))
        setState({ fullname: "", ownername: "" })
        setErrorMsg('')
      } else {
        dispatch(updateCommerceInitiate(userId, state))
        setUserId(null)
        setEditMode(false)
        setState({ fullname: "", ownername: "" })
        setErrorMsg('')
      }
    }
  }

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

      <MDBContainer fluid>
        <MDBRow>
          <MDBCol md='8'>
            <MDBTable className="MDBTable" bordered>
              <MDBTableHead dark>
                <tr>
                  <th scope='col'>No</th>
                  <th scope='col'>Fullname</th>
                  <th scope='col'>Ownername</th>
                </tr>
              </MDBTableHead>
              {commerces && commerces.map((item, index) => (
                <MDBTableBody key={index}>
                  <tr>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.fullname}</td>
                    <td>{item.ownername}</td>
                    <td>
                      <MDBBtn
                        className="m-1"
                        tag="a"
                        color="none"
                        style={{ color: "#3b5998" }}
                        onClick={() => handleModal(item.id)}
                      >
                        <MDBIcon fas icon="eye" size="lg" />
                      </MDBBtn>
                      <MDBBtn
                        className="m-1"
                        tag="a"
                        color="none"
                        style={{ color: "#55acee" }}
                        onClick={() => editContact(item.id)}
                      >
                        <MDBIcon fas icon="pen" size="lg" />
                      </MDBBtn>
                      <MDBBtn
                        className="m-1"
                        tag="a"
                        color="none"
                        style={{ color: "#dd4b39" }}
                        onClick={() => deleteContact(item.id)}
                      >
                        <MDBIcon fas icon="trash" size="lg" />
                      </MDBBtn>
                    </td>
                  </tr>
                  {modalOpen && (
                    <MDBModal show={modalOpen} tabIndex='-1'>
                      <MDBModalDialog>
                        <MDBModalContent>
                          <MDBModalHeader>
                            <MDBModalTitle style={{ color: '#333333' }}>Contact Info</MDBModalTitle>
                            <MDBBtn
                              className='btn-close'
                              color='none' onClick={handleCloseModal}
                            ></MDBBtn>
                          </MDBModalHeader>
                          <MDBModalBody style={{ color: '#333333' }}>
                            {modalBody}
                          </MDBModalBody>

                          <MDBModalFooter>
                            <MDBBtn
                              color='secondary'
                              onClick={handleCloseModal}
                            >
                              Close
                            </MDBBtn>
                          </MDBModalFooter>
                        </MDBModalContent>
                      </MDBModalDialog>
                    </MDBModal>
                  )}
                </MDBTableBody>
              ))}

            </MDBTable>
          </MDBCol>
          <MDBCol md='4'>
            <form onSubmit={handleSubmit} className={classes.root}>
              <MDBTypography
                className="text-start"
                variant='h4'>
                {!editMode ? "Add Commerce" : "Update Commerce"}
              </MDBTypography>
              {errorMsg && <h4 style={{ color: "#dd4b39" }}>{errorMsg}</h4>}
              <MDBInput
                label="Name"
                value={ownername || ''}
                name="ownername"
                type="text"
                onChange={handleInputChange}
              />
              <br />
              <MDBInput
                label="Email"
                value={ownername || ''}
                name="ownername"
                type="text"
                onChange={handleInputChange}
              />
              <br />
              <MDBBtn
                style={{ width: "100px" }}
                color={!editMode ? 'success' : 'warning'}
                type="sumbit"
              >
                {!editMode ? "Submit" : "Edit"}
              </MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}
