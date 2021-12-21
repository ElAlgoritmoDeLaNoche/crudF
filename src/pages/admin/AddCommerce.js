import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { addCommerceInitiate, getCommercesInitiate, deleteCommerceInitiate, getCommerceInitiate, updateCommerceInitiate, reset } from '../../redux/Actions'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTypography, MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, } from 'mdb-react-ui-kit'
import { makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Document, Page, Text, View, PDFDownloadLink } from '@react-pdf/renderer'

const initialState = {
  name: '',
  email: '',
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

export default function AddCommerce() {

  const classes = useStyles()
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [state, setState] = useState(initialState)
  const [editMode, setEditMode] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [userId, setUserId] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const { 
    name, 
    email, 
    ownername, 
    suburb, 
    street, 
    number, 
    cp, 
    numberphone, 
    turn, 
    registrationdate,
    status
  } = state;

  const dispatch = useDispatch()
  const { commerces, commerce: singleCommerce } = useSelector(state => state.data)

  useEffect(() => {
    dispatch(getCommercesInitiate())
  }, [])

  useEffect(() => {
    if (singleCommerce) {
      setState({ ...singleCommerce })
    }
  }, [singleCommerce])

  const deleteCommerce = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      dispatch(deleteCommerceInitiate(id))
    }
  }

  const editCommerce = (id) => {
    setEditMode(true)
    setUserId(id)
    dispatch(getCommerceInitiate(id))
  }

  const modalBody = (
    <div className="row">
      <div className="col-sm-4">Name:</div>
      <div className="col-sm-8">{ !editMode ? singleCommerce.name : ''} </div>
      <div className="col-sm-4">Email:</div>
      <div className="col-sm-8">{singleCommerce.email}</div>
      <div className="col-sm-4">Owner Name:</div>
      <div className="col-sm-8">{singleCommerce.ownername}</div>
      <div className="col-sm-4">Suburb:</div>
      <div className="col-sm-8">{singleCommerce.suburb}</div>
      <div className="col-sm-4">Street:</div>
      <div className="col-sm-8">{singleCommerce.street}</div>
      <div className="col-sm-4">Number:</div>
      <div className="col-sm-8">{singleCommerce.number}</div>
      <div className="col-sm-4">C.P.:</div>
      <div className="col-sm-8">{singleCommerce.number}</div>
      <div className="col-sm-4">Numberphone:</div>
      <div className="col-sm-8">{singleCommerce.numberphone}</div>
      <div className="col-sm-4">Turn:</div>
      <div className="col-sm-8">{singleCommerce.turn}</div>
      <div className="col-sm-4">Registration date:</div>
      <div className="col-sm-8">{singleCommerce.registrationdate}</div>
      <div className="col-sm-4">status:</div>
      <div className="col-sm-8">{singleCommerce.status}</div>
    </div>
  )


  const handleModal = (id) => {
    setModalOpen(true)
    dispatch(getCommerceInitiate(id))
  }

  const handlePdfDownload = (
    <Document>
      <Page size="A4">
        <View style={{ display: 'flex', flexDirection: 'colum', justifyContent: 'center', alignItems: 'center'}}>
          <view><Text>Name:</Text></view>
          <view><Text>{singleCommerce.name}</Text></view>
          <view><Text>Email:</Text></view>
          <view><Text>{singleCommerce.email}</Text></view>
          <view><Text>Owner Name:</Text></view>
          <view><Text>{singleCommerce.ownername}</Text></view>
          <view><Text>Suburb:</Text></view>
          <view><Text>{singleCommerce.suburb}</Text></view>
          <view><Text>Street:</Text></view>
          <view><Text>{singleCommerce.street}</Text></view>
          <view><Text>Number:</Text></view>
          <view><Text>{singleCommerce.number}</Text></view>
          <view><Text>C.P.:</Text></view>
          <view><Text>{singleCommerce.number}</Text></view>
          <view><Text>Numberphone:</Text></view>
          <view><Text>{singleCommerce.numberphone}</Text></view>
          <view><Text>Turn:</Text></view>
          <view><Text>{singleCommerce.turn}</Text></view>
          <view><Text>Registration date:</Text></view>
          <view><Text>{singleCommerce.registrationdate}</Text></view>
          <view><Text>status:</Text></view>
          <view><Text>{singleCommerce.status}</Text></view>
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
    if (!name || !email || !ownername || !suburb || !street || !number || !cp || !numberphone || !turn || !registrationdate || !status) {
      setErrorMsg('Please fill all required input field')
    } else {
      if (!editMode) {
        dispatch(addCommerceInitiate(state))
        setState({ name: "", email: "", ownername: "", suburb: "", street: "", number: "", cp: "", numberphone: "", turn: "", registrationdate: "", status: "" })
        setErrorMsg('')
      } else {
        dispatch(updateCommerceInitiate(userId, state))
        setUserId(null)
        setEditMode(false)
        setState({ name: "", email: "", ownername: "", suburb: "", street: "", number: "", cp: "", numberphone: "", turn: "", registrationdate: "", status: "" })
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
                  <th scope='col'>Action</th>
                </tr>
              </MDBTableHead>
              {commerces && commerces.map((item, index) => (
                <MDBTableBody key={index}>
                  <tr>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
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
                        onClick={() => editCommerce(item.id)}
                      >
                        <MDBIcon fas icon="pen" size="lg" />
                      </MDBBtn>
                      <MDBBtn
                        className="m-1"
                        tag="a"
                        color="none"
                        style={{ color: "#dd4b39" }}
                        onClick={() => deleteCommerce(item.id)}
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
                            <MDBModalTitle style={{ color: '#333333' }}>Commerce Info</MDBModalTitle>
                            <MDBBtn
                              className='btn-close'
                              color='none' onClick={handleCloseModal}
                            ></MDBBtn>
                          </MDBModalHeader>
                          <MDBModalBody style={{ color: '#333333' }}>
                            {!editMode ? modalBody : ''}
                          </MDBModalBody>

                          <MDBModalFooter>
                            <PDFDownloadLink 
                              document={handlePdfDownload} 
                              fileName="document.pdf"
                            >
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
                {!editMode ? "Add Commercee" : "Update Commerce"}
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
                label="Owner name"
                value={ownername || ''}
                name="ownername"
                type="text"
                onChange={handleInputChange}
              />
              <br />
              <MDBInput
                label="Suburb"
                value={suburb || ''}
                name="suburb"
                type="text"
                onChange={handleInputChange}
              />
              <br />
              <MDBInput
                label="Street"
                value={street || ''}
                name="street"
                type="text"
                onChange={handleInputChange}
              />
              <br />
              <MDBInput
                label="Number"
                value={number || ''}
                name="number"
                type="text"
                onChange={handleInputChange}
              />
              <br />
              <MDBInput
                label="C.P."
                value={cp || ''}
                name="cp"
                type="text"
                onChange={handleInputChange}
              />
              <br />
              <MDBInput
                label="Number phone"
                value={numberphone || ''}
                name="numberphone"
                type="text"
                onChange={handleInputChange}
              />
              <br />
              <MDBInput
                label="Turn"
                value={turn || ''}
                name="turn"
                type="text"
                onChange={handleInputChange}
              />
              <br />
              <MDBInput
                label="Registration Date"
                value={registrationdate || ''}
                name="registrationdate"
                type="text"
                onChange={handleInputChange}
              />
              <br />
              <MDBInput
                label="Status"
                value={status || ''}
                name="status"
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
