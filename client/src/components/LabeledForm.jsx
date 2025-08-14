import "./styles/LabeledForm.css";

function LabeledForm({ fields, values, onChange }) {
  return (
    <form className="form-container">
      {fields.map(({ label, name, type }) => (
        <div className="input-container" key={name}>
          <p className="input-label">{label}</p>
          {type === "select" ? (
            <select
              className="input-form"
              name={name}
              value={values[name] || "Choose"}
              onChange={onChange}
            >
              <option value="" hidden>
                Choose
              </option>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          ) : (
            <input
              className="input-form"
              type={type}
              name={name}
              value={values[name] || ""}
              onChange={onChange}
            />
          )}
        </div>
      ))}
    </form>
  );
}

export default LabeledForm;
