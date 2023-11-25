import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import avatar from '../assets/images/avatar.png';
import Alert from '../components/alert/alert.jsx';

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

function RowContent({ title, edit, onChange, value }) {
  function GetOptions() {
    const InputComponent = inputTypes[title];
    return InputComponent
      ? InputComponent({
          onChange: (e) => onChange(title, e.target.value),
          value,
        })
      : null;
  }

  return (
    <div className="home-page-container-row-content">
      <div className="home-page-container-row-content-titleValue">{title}:</div>
      {edit ? GetOptions() : <div className="home-page-container-row-content-value">{value || 'Not Set'} </div>}
    </div>
  );
}

RowContent.propTypes = {
  title: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const getSelectOptions = (props) => (
  <select name={props.title} id={props.title} onChange={props.onChange} value={props.value}>
    {props.options.map((option) => (
      <option key={`key-${option.value}`} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const inputTypes = {
  Age: (props) =>
    getSelectOptions({
      ...props,
      options: Array.from({ length: 100 }, (_, i) => ({ value: i + 1, label: i + 1 })),
    }),
  Gender: (props) =>
    getSelectOptions({
      ...props,
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
      ],
    }),
  // eslint-disable-next-line react/prop-types
  Email: (props) => <input type="email" placeholder="Enter your email" onChange={props.onChange} value={props.value} />,
  'Phone Number': (props) => (
    <input type="tel" placeholder="Enter your phone number" onChange={props.onChange} value={props.value} />
  ),
};
