import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { styled } from "styled-components"
import { colors } from '../assets/colors';


const Header = () => {
    return (
<>
<StyledNavBar expand="lg" className="navbar mb-3 py-3" fixed='top'>
          <StyledContainer fluid>
            {/* Logo */}
            <Navbar.Brand href="#" className="navbar-brand fs-4">Pulse Peak</Navbar.Brand>
            {/* Toggle Button */}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} className="shadow-none border-0" />
            {/* SiderBar */}
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="end"
              className="sidebar"
            >
              {/* SideBar Header */}
              <Offcanvas.Header closeButton className="border-bottom">
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`} >
                  Bootstrap Navbar
                </Offcanvas.Title>
              </Offcanvas.Header>
              {/* SideBar Body */}
              <Offcanvas.Body>
              {/* Searchbar */}
              <Form className="d-flex flex-grow-1 justify-content-center">
              <SearchBar
                type="search"
                placeholder="Search"
                className="me-2 w-50"
                aria-label="Search"
                />
                </Form>
                <Nav className="justify-content-center flex-grow-2 pe-3 mx-2 align-items-center fs-5 ">
                  <Nav.Link href="#action1" className="mx-2">Home</Nav.Link>
                  <Nav.Link href="#action2" className="mx-2">Link</Nav.Link>
                  {/* Dropdown */}
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-lg`}
                    className="mx-2"
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </StyledContainer>
        </StyledNavBar>
    </>
    )
}

export default Header

const StyledNavBar = styled(Navbar)`
  box-shadow: 0 4px 5px -5px rgb(0 0 0 / 23%);
  background-color: ${colors.white};
`

const StyledContainer = styled(Container)`
width: 80rem;
`

const SearchBar = styled(Form.Control)`
  border: 1px solid #9d9d9d;
  border-radius: 10px;
  background-image: url("https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg");
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: 10px center;
  padding-left: 3rem;
  font-size: 18px;

  &:focus {
    outline: 1px solid #b1b2ff;
    border-color: #b1b2ff;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 3px #b1b2ff;
  }
`