import { useState } from "react";
import LabeledForm from "./LabeledForm";
import Button from "./Button";
import { addItemToWishlist, editItemInWishlist } from "../api/itemApi";
import "./styles/AddEditItem.css";

function AddEditItem({
  type,
  id,
  setCurrentPage,
  editingItem = {},
  refreshWishlist,
}) {
  const {
    name = "",
    description = "",
    priority = "",
    price = "",
    link = "",
  } = editingItem;

  const [formValues, setFormValues] = useState({
    name,
    description,
    priority,
    price,
    link,
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  function validateInputs() {
    const { name, description, priority, price, link } = formValues;

    if (!name) {
      return "Please enter the name of the item you want on your wishlist.";
    }
    if (name.length > 100) {
      return "Item name cannot exceed 100 characters.";
    }
    if (description.length > 200) {
      return "Item description cannot exceed 200 characters.";
    }
    if (!priority) {
      return "Select a priority to show how much you want this item.";
    }
    if (!price) {
      return "Please enter an estimated price for the wishlist item.";
    }
    if (price && (isNaN(price) || parseFloat(price) < 0)) {
      return "Price must be a valid number greater than or equal to 0.";
    }
    if (link && !/^https?:\/\/[^\s]+$/.test(link)) {
      return "Please provide a valid product link.";
    }

    return null;
  }

  async function handleSubmit() {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    if (type === "add") {
      await addItemToWishlist(
        id,
        formValues.name,
        formValues.description,
        formValues.link,
        formValues.price,
        formValues.priority
      );
    } else {
      await editItemInWishlist(
        id,
        formValues.name,
        formValues.description,
        formValues.link,
        formValues.price,
        formValues.priority
      );
    }

    setCurrentPage("wishlist");
    await refreshWishlist();
  }

  const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Description", name: "description", type: "text" },
    { label: "Priority", name: "priority", type: "select" },
    { label: "Price", name: "price", type: "text" },
    { label: "Link", name: "link", type: "text" },
  ];

  return (
    <div className="add-edit-item-container">
      <div className="add-edit-item-form">
        <div className="form-columns">
          <div className="form-column">
            <LabeledForm
              fields={fields.slice(0, 2)}
              values={formValues}
              onChange={handleChange}
            />
          </div>
          <div className="form-column right-form">
            <div className="right-top-row">
              <LabeledForm
                fields={fields.slice(2, 3)}
                values={formValues}
                onChange={handleChange}
              />
              <LabeledForm
                fields={fields.slice(3, 4)}
                values={formValues}
                onChange={handleChange}
              />
            </div>
            <div className="right-bottom-row">
              <LabeledForm
                fields={fields.slice(4, 5)}
                values={formValues}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="error-placeholder-container">
          <p className="error-placeholder">{error}</p>
        </div>
        <Button
          name={type === "add" ? "Add Item" : "Save Changes"}
          style="submit-button"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default AddEditItem;
