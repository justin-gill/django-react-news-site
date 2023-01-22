import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Social from '../components/Social'
import logo from '../assets/images/logo.svg'

function Header() {
    return (
        <Navbar collapseOnSelect expand="lg" className='nav' variant='dark' bg='dark'>
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Navbar.Brand as={Link} to="/">
                    <img
                        src={logo}
                        width="35"
                        height="35"
                        className="d-inline-block align-top"
                        alt='Logo'
                    /> Home
                </Navbar.Brand>
                    <Nav className="m-auto">
                        <Nav.Link as={Link} to="/category/world">World</Nav.Link>
                        <Nav.Link as={Link} to="/category/us">U.S.</Nav.Link>
                        <Nav.Link as={Link} to="/category/technology">Technology</Nav.Link>
                        <Nav.Link as={Link} to="/category/business">Business</Nav.Link>
                        <Nav.Link as={Link} to="/category/politics">Politics</Nav.Link>
                        <Nav.Link as={Link} to="/category/opinion">Opinion</Nav.Link>
                        <Nav.Link as={Link} to="/category/science">Science</Nav.Link>
                        <Nav.Link as={Link} to="/category/health">Health</Nav.Link>
                        <Nav.Link as={Link} to="/category/style">Style</Nav.Link>
                        <Nav.Link as={Link} to="/category/travel">Travel</Nav.Link>
                    </Nav>
                    <Social/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;