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
        <RowContent title="Age" />
        <RowContent title="Gender" />
        <RowContent title="Email" />
        <RowContent title="Phone Number" />
      </div>
      <div className="home-page-container-button" onClick={() => setEditStatus(!editStatus)}>
        {editStatus ? 'Save' : 'Edit'}
      </div>
    </div>
  );
}

export default Home;

function RowContent(props) {
  const { title } = props;
  return (
    <div className="home-page-container-row-content">
      {title}: <div className="home-page-container-row-content-value">{localStorage.getItem(title) || 'Not Set'} </div>
    </div>
  );
}

RowContent.propTypes = {
  title: PropTypes.string.isRequired,
};
