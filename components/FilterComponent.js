import PropTypes from 'prop-types';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const FilterComponent = ({ setQuery, setQuery2 }) => {
  const [title, setTitle] = useState('Day Filter');
  const [title2, setTitle2] = useState('Session Times');

  const handleSelect = (eventKey) => {
    // console.log('select drop test', eventKey)
    setQuery(eventKey);
    setTitle(eventKey);
  };

  const handleSelect2 = (eventKey) => {
    // console.log('select drop test', eventKey)
    setQuery2(eventKey);
    setTitle2(eventKey);
  };

  return (
    <>
      <Dropdown>
        <DropdownButton
          id="dayDropdown"
          variant="secondary"
          menuVariant="dark"
          title={title}
          className=""
          onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="Sunday">Sunday</Dropdown.Item>
          <Dropdown.Item eventKey="Monday">Monday</Dropdown.Item>
          <Dropdown.Item eventKey="Tuesday">Tuesday</Dropdown.Item>
          <Dropdown.Item eventKey="Wednesday">Wednesday</Dropdown.Item>
          <Dropdown.Item eventKey="Thursday">Thursday</Dropdown.Item>
          <Dropdown.Item eventKey="Friday">Friday</Dropdown.Item>
          <Dropdown.Item eventKey="Saturday">Saturday</Dropdown.Item>
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
        </DropdownButton>
      </Dropdown>

      <DropdownButton
        id="sessionDropdown"
        variant="secondary"
        menuVariant="dark"
        title={title2}
        className=""
        onSelect={handleSelect2}
      >
        <Dropdown.Item eventKey="Morning (AMs before Noon)">Morning (AMs before Noon)</Dropdown.Item>
        <Dropdown.Item eventKey="Afternoon (Noon - 5pm)">Afternoon (Noon - 5pm)</Dropdown.Item>
        <Dropdown.Item eventKey="Evening (5pm - 9pm)">Evening (5pm - 9pm)</Dropdown.Item>
        <Dropdown.Item eventKey="Night (9pm - Midnight)">Night (9pm - Midnight)</Dropdown.Item>
        <Dropdown.Item eventKey="Varies">Varies</Dropdown.Item>
        <Dropdown.Item eventKey="All">All</Dropdown.Item>
      </DropdownButton>
    </>
  );
};

export default FilterComponent;

FilterComponent.propTypes = {
  setQuery: PropTypes.func.isRequired,
  setQuery2: PropTypes.func.isRequired,
};
