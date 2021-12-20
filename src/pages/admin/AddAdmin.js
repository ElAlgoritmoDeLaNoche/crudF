import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { addContactInitiate, getContactsInitiate, deleteContactInitiate, getContactInitiate, updateContactInitiate, reset } from '../../redux/Actions'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTypography, MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, } from 'mdb-react-ui-kit'
import { makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Document, Page, Text, View, PDFDownloadLink } from '@react-pdf/renderer'

const initialState = {
  name: '',
  contact: '',
  email: '',
  address: '',
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


  const { name, contact, email, address } = state;

  const dispatch = useDispatch()
  const { contacts, contact: singleContact } = useSelector(state => state.data)

  useEffect(() => {
    dispatch(getContactsInitiate())
  }, [])

  useEffect(() => {
    if (singleContact) {
      setState({ ...singleContact })
    }
  }, [singleContact])

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
      <div className="col-sm-8">{singleContact.name}</div>
      <div className="col-sm-4">Email:</div>
      <div className="col-sm-8">{singleContact.email}</div>
      <div className="col-sm-4">Contact:</div>
      <div className="col-sm-8">{singleContact.contact}</div>
      <div className="col-sm-4">Address:</div>
      <div className="col-sm-8">{singleContact.address}</div>
    </div>
  )

  const handleModal = (id) => {
    setModalOpen(true)
    dispatch(getContactInitiate(id))
  }

  const handlePdfDownload = (
    <Document>
      <Page size="A4">
        <View style={{ display: 'flex', flexDirection: 'colum', justifyContent: 'center', alignItems: 'center'}}>
          <view><Text>Name:</Text></view>
          <view><Text>{singleContact.name}</Text></view>
          <view><Text>Email:</Text></view>
          <view><Text>{singleContact.email}</Text></view>
          <view><Text>Contact:</Text></view>
          <view><Text>{singleContact.contact}</Text></view>
          <view><Text>Address:</Text></view>
          <view><Text>{singleContact.address}</Text></view>
        </View>
      </Page>
    </Document>
  )

  const handleCloseModal = () => {
    setModalOpen(false)
    dispatch(reset())
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !contact || !email || !address) {
      setErrorMsg('Please fill all required input field')
    } else {
      if (!editMode) {
        dispatch(addContactInitiate(state))
        setState({ name: "", contact: "", email: "", address: "" })
        setErrorMsg('')
      } else {
        dispatch(updateContactInitiate(userId, state))
        setUserId(null)
        setEditMode(false)
        setState({ name: "", contact: "", email: "", address: "" })
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
                  <th scope='col'>Name</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Contact</th>
                  <th scope='col'>Address</th>
                  <th scope='col'>Action</th>
                </tr>
              </MDBTableHead>
              {contacts && contacts.map((item, index) => (
                <MDBTableBody key={index}>
                  <tr>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
                    <td>{item.address}</td>
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
                            <PDFDownloadLink document={handlePdfDownload} fileName="document.pdf">
                              <MDBBtn>
                                Pdf Download
                              </MDBBtn>
                            </PDFDownloadLink>
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
                {!editMode ? "Add Contact" : "Update Contact"}
              </MDBTypography>
              {errorMsg && <h4 style={{ color: "#dd4b39" }}>{errorMsg}</h4>}
              <MDBInput
                label="Name"
                value={name || ''}
                name="name"
                type="text"
                onChange={handleInputChange}
              />
              <br />
              <MDBInput
                label="Email"
                value={email || ''}
                name="email"
                type="text"
                onChange={handleInputChange}
              />
              <br />
              <MDBInput
                label="Contact"
                value={contact || ''}
                name="contact"
                type="text"
                onChange={handleInputChange}
              />
              <br />
              <MDBInput
                label="Address"
                value={address || ''}
                name="address"
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
