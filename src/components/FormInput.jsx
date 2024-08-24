const FormInput = ({ label, name, type, defaultValue, placeholder, size }) => {
  return (
    <div>
      <label className="form-control">
        <div className="label">
          <span className="label-text capitalize">{label}</span>
        </div>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          defaultValue={defaultValue}
          className={`input input-bordered w-full max-w-xs ${size}`}
        />
      </label>
    </div>
  );
};

export default FormInput;
