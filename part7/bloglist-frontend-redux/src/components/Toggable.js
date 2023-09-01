// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { cloneElement, Children, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Toggable = ({ showButtonLabel, hideButtonLabel, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const hideComponent = { display: isVisible ? 'none' : 'flex' };
  const showComponent = { display: isVisible ? 'flex' : 'none' };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // eslint-disable-next-line max-len
  const childrenWithToggle = Children.map(children, (child) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    cloneElement(child, { toggleVisibility }));

  return (
    <div>
      <div style={hideComponent}>
        <Button
          id="toggable-show"
          variant="outlined"
          sx={{
            m: '0 auto'
          }}
          onClick={toggleVisibility}
        >
          {showButtonLabel}
        </Button>
      </div>
      <div style={showComponent}>
        <Box
          sx={{
            m: '1rem auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {childrenWithToggle}
          <Button
            id="toggable-hide"
            variant="outlined"
            onClick={toggleVisibility}
            sx={{
              m: '0 auto'
            }}
          >
            {hideButtonLabel}
          </Button>
        </Box>
      </div>
    </div>
  );
};

Toggable.propTypes = {
  showButtonLabel: PropTypes.string.isRequired,
  hideButtonLabel: PropTypes.string.isRequired,
};

export default Toggable;
