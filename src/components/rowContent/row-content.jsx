import PropTypes from 'prop-types';

export default function RowContent({ title, edit, onChange, value }) {
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
