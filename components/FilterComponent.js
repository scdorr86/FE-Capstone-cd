import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const FilterComponent = ({ getPosts, setQuery }) => {
  const handleSelect = (eventKey) => {
    console.log('select drop test', eventKey);
  };

  // setQuery(eventKey);

  return (
    <>
      <Dropdown>
        <DropdownButton
          id="dropdown-button-dark-example2"
          variant="secondary"
          menuVariant="dark"
          title="Day Filter"
          className="mt-2"
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
        id="dropdown-button-dark-example2"
        variant="secondary"
        menuVariant="dark"
        title="Session Times"
        className="mt-2"
      >
        <Dropdown.Item href="#/action-1" active>
          Action
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
      </DropdownButton>
    </>
  );
};

export default FilterComponent;

FilterComponent.propTypes = {
  setQuery: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
};
