import { useState, useRef, useEffect } from 'react';
import avatar from '../assets/images/avatar.png';
import Alert from '../components/alert/alert.jsx';
import RowContent from '../components/rowContent/row-content.jsx';

function Home() {
  const [editStatus, setEditStatus] = useState(false);
  const isInitialRender = useRef(true);
  const [emailError, setEmailError] = useState(false);
  const [inputValues, setInputValues] = useState({
    Username: localStorage.getItem('Username') || 'username',
    Age: localStorage.getItem('Age') || '18',
    Gender: localStorage.getItem('Gender') || 'Male',
    Email: localStorage.getItem('Email') || '',
    'Phone Number': localStorage.getItem('Phone Number') || '',
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = inputValues.Email;

  useEffect(() => {
    setTimeout(() => {
      if (emailError) {
        setEmailError(false);
      }
    }, [1000]);
  }, [emailError]);

  const onSave = () => {
    setEmailError(false);
    if (isInitialRender.current) {
      isInitialRender.current = false;
    }

    if (!editStatus) {
      setEditStatus(true);
    } else if (email.length > 0 && !emailRegex.test(email)) {
      setEmailError(true);
    } else {
      Object.entries(inputValues).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });
      setEditStatus(false);
    }
  };

  const handleInputChange = (title, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [title]: value,
    }));
  };

  return (
    <>
      {!editStatus && !isInitialRender.current && <Alert type="success" />}
      {emailError && <Alert type="danger" />}
      <div className="home-page-container">
        <div className="home-page-container-header">
          <div className="avatar">
            <img src={avatar} alt="avatar" />
          </div>
          <div className="username">
            {editStatus ? (
              <input
                type="text"
                value={inputValues.Username}
                onChange={(e) => handleInputChange('Username', e.target.value)}
              />
            ) : (
              inputValues.Username || 'UNKNOWN'
            )}
          </div>
        </div>
        <div className="home-page-container-content">
          <RowContent title="Age" edit={editStatus} onChange={handleInputChange} value={inputValues.Age} />
          <RowContent title="Gender" edit={editStatus} onChange={handleInputChange} value={inputValues.Gender} />
          <RowContent title="Email" edit={editStatus} onChange={handleInputChange} value={inputValues.Email} />
          <RowContent
            title="Phone Number"
            edit={editStatus}
            onChange={handleInputChange}
            value={inputValues['Phone Number']}
          />
        </div>
        <div className="home-page-container-button" onClick={onSave}>
          {editStatus ? 'Save' : 'Edit'}
        </div>
      </div>
    </>
  );
}

export default Home;
