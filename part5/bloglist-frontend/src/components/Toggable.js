import { useState } from 'react';

const Toggable = ({
  buttonLabel, children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const hideComponent = { display: isVisible ? 'none' : '' };
  const showComponent = { display: isVisible ? '' : 'none' };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <div style={hideComponent}>
        <button type="button" onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showComponent}>
        {children}
        <button type="button" onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
};

export default Toggable;
