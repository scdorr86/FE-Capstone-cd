/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PropTypes from 'prop-types';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import { signOut } from '../utils/auth';
import ProfileForm from './forms/ProfileForm';
import { getAllPosts } from '../api/postData';
import PostForm from './forms/PostForm';

export default function NavBarAuth({ searchInput, setSearchInput }) {
  // const router = useRouter();
  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    getAllPosts().then(setPosts);
  };

  console.log(posts);

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchInput(e.target.value.toLowerCase());
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={false} className="mb-3">
          <Container fluid>
            <Navbar.Brand className="fw-bold" style={{ color: 'orange' }} href="/"><Image className="logo" src="/logotest.png" /></Navbar.Brand>
            <PostForm onUpdate={getPosts} />
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link style={{ color: 'orange' }} href="/profile">Profile</Nav.Link>
                  <Nav.Link style={{ color: 'orange' }} href="/">Postings Home</Nav.Link>
                  <NavDropdown
                    style={{ color: 'orange' }}
                    title="Other Links"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="https://www.playstation.com/en-us/">Playstation</NavDropdown.Item>
                    <NavDropdown.Item href="https://www.xbox.com/en-US/">
                      Xbox
                    </NavDropdown.Item>
                    <NavDropdown.Item href="https://www.pcgamer.com/">
                      PC Gamer
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchInput}
                    onChange={handleChange}
                  />
                  <Button style={{ color: 'orange' }} variant="outline-dark">Search</Button>
                </Form>
                <ProfileForm />
                <Button style={{ color: 'orange' }} className="modalForm bg-dark border-0 mx-3" onClick={signOut}>Sign Out</Button>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>

  // <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  //   <Container>
  //     <Link passHref href="/profile">
  //       <Navbar.Brand>Profile</Navbar.Brand>
  //     </Link>
  //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  //     <Navbar.Collapse id="responsive-navbar-nav">
  //       <Nav className="me-auto">
  //         {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
  //         <Link passHref href="/">
  //           <Nav.Link>Postings</Nav.Link>
  //         </Link>
  //         <ProfileForm />
  //         <Button className="modalForm bg-transparent border-0" onClick={signOut}>Sign Out</Button>
  //       </Nav>
  //     </Navbar.Collapse>
  //   </Container>
  // </Navbar>
  );
}

NavBarAuth.propTypes = {
  searchInput: PropTypes.string,
  setSearchInput: PropTypes.func,
};

NavBarAuth.defaultProps = {
  searchInput: '',
  setSearchInput: () => {},
};
