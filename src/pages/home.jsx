import { useState } from 'react';
import PropTypes from 'prop-types';
import avatar from '../assets/images/avatar.png';

function Home() {
  const [editStatus, setEditStatus] = useState(false);

  return (
    <div className="home-page-container">
      <div className="home-page-container-header">
        <div className="avatar">
          <img src={avatar} alt="avatar" />
        </div>
        <div className="username">{localStorage.getItem('username') || 'username'}</div>
      </div>
      <div className="home-page-container-content">
        <RowContent title="Age" edit={editStatus} />
        <RowContent title="Gender" edit={editStatus} />
        <RowContent title="Email" edit={editStatus} />
        <RowContent title="Phone Number" edit={editStatus} />
      </div>
      <div className="home-page-container-button" onClick={() => setEditStatus(!editStatus)}>
        {editStatus ? 'Save' : 'Edit'}
      </div>
    </div>
  );
}

export default Home;

const getSelectOptions = (title, options) => (
  <select name={title} id={title}>
    {options.map((option) => (
      <option key={`key${option.value}`} value={option.value || option}>
        {option.label || option}
      </option>
    ))}
  </select>
);

const inputTypes = {
  Age: () =>
    getSelectOptions(
      'Age',
      Array.from({ length: 100 }, (_, i) => ({ value: i + 1, label: i + 1 }))
    ),
  Gender: () =>
    getSelectOptions('Gender', [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ]),
  Email: () => <input type="email" placeholder="Enter your email" defaultValue={localStorage.getItem('Email')} />,
  'Phone Number': () => (
    <input type="number" placeholder="Enter your phone number" defaultValue={localStorage.getItem('Phone Number')} />
  ),
};
function RowContent(props) {
  const { title, edit } = props;

  function GetOptions(titleValue) {
    const InputComponent = inputTypes[titleValue];
    return InputComponent ? InputComponent() : null;
  }

  return (
    <div className="home-page-container-row-content">
      <div className="home-page-container-row-content-titleValue">{title}:</div>
      {edit ? (
        GetOptions(title)
      ) : (
        <div className="home-page-container-row-content-value">{localStorage.getItem(title) || 'Not Set'} </div>
      )}
    </div>
  );
}

RowContent.propTypes = {
  title: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
};
