import { useState, useEffect } from 'react';
import './alert.css';

function Alert() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return isVisible ? <div className="alert-container">Save successfully</div> : null;
}

export default Alert;
