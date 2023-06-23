import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Image } from 'react-bootstrap';
import Link from 'next/link';

export default function GameModal({ gamesObj }) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setShow(false);
    router.push('/games');
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        // variant="light"
        className="gamesBtn"
        onClick={handleShow}
        // style={{ color: 'orange', minWidth: '125px' }}
      >
        {gamesObj.name}
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header className="bg-black" closeButton>
          <Modal.Title style={{ color: 'orange' }}>{gamesObj.name}</Modal.Title>
        </Modal.Header>
        <Image src={gamesObj.background_image} />
        <Modal.Body className="bg-light">
          <li className="customBullet">Release Date: {gamesObj?.released}</li>
          <li className="profileLi">Genre: {gamesObj?.genres?.map((item) => (item.name)).join(', ')}</li>
          <li className="gameDetailItem">Rating: {gamesObj?.rating} out of {gamesObj?.rating_top}</li>
          <li className="gameDetailItem">ESRB Rating: {gamesObj?.esrb_rating?.name}</li>
          <li className="gameDetailItem">Platforms: {gamesObj?.platforms.map((item) => (item.platform.name)).join(', ')}</li>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-around">
          <Link href={`/modalScreenshots/${gamesObj?.id}`} passHref>
            <Button className="" variant="dark" style={{ color: 'orange', minWidth: '170px' }}>Screenshots</Button>
          </Link>
          <Button
            variant="dark"
            className=""
            onClick={handleClose}
            style={{ color: 'orange', minWidth: '125px' }}
          >
            Close Game Details
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

GameModal.propTypes = {
  gamesObj: PropTypes.shape().isRequired,
};
