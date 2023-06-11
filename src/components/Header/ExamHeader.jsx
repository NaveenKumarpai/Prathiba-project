import React from 'react'
import { Container, Navbar, Nav, Button} from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import Logo from "../assests/Logo.jpg";

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
       return navigate('/');
      };
  return (
   
        <Navbar>
            <Container>
                <Navbar.Brand><img src={ Logo } alt="Logo"  width={"100px"} height={"100px"}/></Navbar.Brand>
                <Nav className='nav-list'> 
                        <div>
                            <Button onClick={handleLogout}>Logout</Button>
                        </div>  
                </Nav>
            </Container>
        </Navbar>   
    
  )
}

export default Header;