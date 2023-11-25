import { useState, useEffect } from 'react';
import './alert.css';
import PropTypes from 'prop-types';

function Alert({ type }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return isVisible ? (
    <div className="alert-container" style={{ backgroundColor: type === 'success' ? '' : 'red' }}>
      {type === 'success' ? 'Save successfully' : 'Wrong Email'}
    </div>
  ) : null;
}

export default Alert;

Alert.propTypes = {
  type: PropTypes.string.isRequired,
};
