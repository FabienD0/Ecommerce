import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { styled } from "styled-components"
import { colors } from '../assets/colors';
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from 'react';
import SearchResult from './modals/SearchResult';
import { PropsHeader } from './utils/types';
import { useAppSelector } from '../redux/app/hooks';

const Header: React.FC<PropsHeader> = ({setIsCart}) => {

  const [searchInput,setSearchInput] = useState<string>("");
  const [isSearchResultActive,setIsSearchResultActive] = useState<boolean>(false);


  const { totalQuantity } = useAppSelector((store) => store.cart)


  /* When user Type on Search Bar */
  const handleSearchInput = (e:React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
  }

  /* If more than 4 character, modal search bar open */
  useEffect(() => {
    if (searchInput.length >= 4) {
      setIsSearchResultActive(true);
    } else {
      setIsSearchResultActive(false);
    }
  }, [searchInput]);

  /* Notif Quantity on Cart Icon */
  const getTotalQuantity = () => {
    if (totalQuantity >= 99) {
      return 99
    } else {
      return totalQuantity
    }
  }

    return (
<>
<StyledNavBar expand="lg" className="navbar mb-3 py-3" fixed='top'>
          <StyledContainer fluid className='p-0'>
            {/* Logo */}
            <Navbar.Brand href="/" className="navbar-brand fs-4">
              <img className="w-50" src="/images/logo.png" alt='logo'/>
            </Navbar.Brand>
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
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              {/* SideBar Body */}
              <Offcanvas.Body>
              {/* Searchbar */}
              <Form className="d-flex d-none d-lg-block flex-grow-1 justify-content-center">
              <div className='container d-flex justify-content-center' style={{position:"relative"}}>
              <SearchBar
                type="search"
                placeholder="Search"
                value={searchInput}
                className="me-2 w-50"
                aria-label="Search"
                onChange={handleSearchInput}
                />
                                {isSearchResultActive && (
            <SearchResult
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              isSearchResultActive={isSearchResultActive}
              setIsSearchResultActive={setIsSearchResultActive}
            />)}
                </div>
                </Form>

                    {/* Dropdown */}
                <Nav className=" align-items-center fs-5">
                    <NavDropdownStyled
                    title="Categories"
                    id={`offcanvasNavbarDropdown-expand-lg`}
                    className="mx-2 fw-bold"
                  >
                    <NavDropdown.Item href="/categories/Fitness" className='fw-bold my-1'>Fitness</NavDropdown.Item>
                    <NavDropdown.Item href="/categories/Medical" className='fw-bold my-1'>Medical</NavDropdown.Item>
                    <NavDropdown.Item href="/categories/Lifestyle" className='fw-bold my-1'>Lifestyle</NavDropdown.Item>
                    <NavDropdown.Item href="/categories/Entertainment" className='fw-bold my-1'>Entertainment</NavDropdown.Item>
                    <NavDropdown.Item href="/categories/Industrial" className='fw-bold my-1'>Industrial</NavDropdown.Item>
                    <NavDropdown.Item href="/categories/Pets and Animals" className='fw-bold my-1'>Pets and Animals</NavDropdown.Item>
                    <NavDropdown.Item href="/categories/Gaming" className='fw-bold my-1'>Gaming</NavDropdown.Item>
                  </NavDropdownStyled>
                  <NavLinkStyled href="/brands" className="mx-2 fw-bold">Brands</NavLinkStyled>
                  {getTotalQuantity() > 0 && <NavLinkStyled href="/cartMobile" className="mx-2 fw-bold d-lg-none">{`Cart (${getTotalQuantity()})`}</NavLinkStyled>}
              {/* Searchbar Mobile*/}
              <Form className="d-lg-none my-2 w-100">
              <div style={{position:"relative"}}>
              <SearchBar
                type="search"
                placeholder="Search"
                value={searchInput}
                className="w-100"
                aria-label="Search"
                onChange={handleSearchInput}
                />
                                {isSearchResultActive && (
            <SearchResult
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              isSearchResultActive={isSearchResultActive}
              setIsSearchResultActive={setIsSearchResultActive}
            />)}
                </div>
                </Form>
                    <button className="mx-2 fw-bold d-none d-lg-block"style={{all:"unset",position:"relative"}} onClick={() => setIsCart(true)}>
                    <FaShoppingCartStyled />
                    {totalQuantity > 0 && (
              <ItemNotif>
                <p style={{all:"unset"}}>{getTotalQuantity()}</p>
              </ItemNotif>
            )}
                    </button>
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
  position: relative;
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

const FaShoppingCartStyled = styled(FaShoppingCart)`
opacity: 0.8;
transition: all 200ms;

&:hover {
  cursor: pointer;
  opacity: 1;
}
`

const ItemNotif = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: #ff5f5f;
  top: -5px;
  right: -5px;
  height: 0.9rem;
  width: 0.9rem;
  border-radius: 50%;
  font-weight: 900;
  font-size: 10px;
`;

const NavDropdownStyled = styled(NavDropdown)`

@media (max-width: 991px) {
  width: 100%;
  }
`

const NavLinkStyled = styled(Nav.Link)`
@media (max-width: 991px) {
  width: 100%;
  }
`