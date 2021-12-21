import React from 'react'
import { Link } from 'react-router-dom'
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBCarouselElement, MDBCarouselCaption, } from 'mdb-react-ui-kit';
import bg1 from '../../img/bg-1.jpeg'
import bg2 from '../../img/bg-2.jpeg'
import bg3 from '../../img/bg-3.jpeg'

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

      <MDBCarousel showIndicators showControls fade>
        <MDBCarouselInner>
          <MDBCarouselItem className='active'>
            <MDBCarouselElement className='bg' src={bg1} alt='...' />
            <MDBCarouselCaption>
              <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </MDBCarouselCaption>
          </MDBCarouselItem>

          <MDBCarouselItem>
            <MDBCarouselElement className='bg' src={bg2} alt='...' />
            <MDBCarouselCaption>
              <h5>Second slide label</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </MDBCarouselCaption>
          </MDBCarouselItem>

          <MDBCarouselItem>
            <MDBCarouselElement className='bg' src={bg3} alt='...' />
            <MDBCarouselCaption>
              <h5>Third slide label</h5>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </MDBCarouselCaption>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </div>
  )
}

export default home