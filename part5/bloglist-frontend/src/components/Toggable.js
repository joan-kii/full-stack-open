// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import {
  cloneElement, Children, useState,
} from 'react';

const Toggable = ({
  showButtonLabel, hideButtonLabel, children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const hideComponent = { display: isVisible ? 'none' : '' };
  const showComponent = { display: isVisible ? '' : 'none' };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // eslint-disable-next-line max-len
  const childrenWithToggle = Children.map(children, (child) => cloneElement(child, { toggleVisibility }));

  return (
    <div>
      <div style={hideComponent}>
        <button id="toggable-show" type="button" onClick={toggleVisibility}>{showButtonLabel}</button>
      </div>
      <div style={showComponent}>
        <button id="toggable-hide" type="button" onClick={toggleVisibility}>{hideButtonLabel}</button>
        {childrenWithToggle}
      </div>
    </div>
  );
};

Toggable.propTypes = {
  showButtonLabel: PropTypes.string.isRequired,
  hideButtonLabel: PropTypes.string.isRequired,
};

export default Toggable;
