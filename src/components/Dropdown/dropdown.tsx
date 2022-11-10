import PropTypes from 'prop-types';

const headerStyle: { [key: string]: string | number } = {
  padding: "10px",
  textAlign: "left",
  fontSize: "20px",
  color: "white",
  opacity: "1",
};

const Dropdown: React.FC<{
  name: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
  options: {}[];
  optionLabel: string;
}> = ({ name, label, onChange, value, options, optionLabel }) => {
  return (
    <div >
      <label style={headerStyle}>{label} </label>
      <select name={name} id={name} onChange={onChange} value={value}>
        {options.map((value: any, index: number) => {
          return <option value={index} key={index}>{value[optionLabel]}</option>;
        })}
      </select>
    </div>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  optionLabel: PropTypes.string.isRequired,
};
