import "./styles/LabeledForm.css";

function LabeledForm({ fields, values, onChange }) {
  const currencyField = ["IDR", "USD", "SGD", "EUR"];
  const priorityField = ["HIGH", "MEDIUM", "LOW"];
  return (
    <form className="form-container">
      {fields.map(({ label, name, type }) => (
        <div className="input-container" key={name}>
          <p className="input-label">{label}</p>
          {type === "select-priority" && (
            <select
              className="input-form"
              name={name}
              value={values[name] || "Choose"}
              onChange={onChange}
            >
              <option value="" hidden>
                Choose
              </option>
              {priorityField.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          )}

          {type === "select-currency" && (
            <select
              className="input-form"
              name={name}
              value={values[name] || "Choose"}
              onChange={onChange}
            >
              <option value="" hidden>
                Choose
              </option>
              {currencyField.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          )}

          {(type === "text" || type === "password") && (
            <div className="input-form-container">
              {name === "description" ? (
                <textarea
                  className="input-form  input-description"
                  type={type}
                  name={name}
                  value={values[name] || ""}
                  onChange={onChange}
                />
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
          )}
        </div>
      ))}
    </form>
  );
}

export default LabeledForm;
