import {
  isValidElement, cloneElement, Children, useState,
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

  const childrenWithToggle = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { toggleVisibility });
    }
    return child;
  });

  return (
    <div>
      <div style={hideComponent}>
        <button type="button" onClick={toggleVisibility}>{showButtonLabel}</button>
      </div>
      <div style={showComponent}>
        <button type="button" onClick={toggleVisibility}>{hideButtonLabel}</button>
        {childrenWithToggle}
      </div>
    </div>
  );
};

export default Toggable;
