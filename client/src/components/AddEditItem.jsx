import { useState } from "react";
import axios from "axios";
import LabeledForm from "./LabeledForm";
import Button from "./Button";
import "./styles/AddEditItem.css";

function AddEditItem({
  type,
  id,
  setCurrentPage,
  editingItem = {},
  refreshWishlist,
}) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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

  function handleChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  async function addItemToWishlist() {
    try {
      console.log(formValues);
      await axios.post(
        `${API_BASE_URL}/item/${id}/add`,
        {
          name: formValues.name,
          desc: formValues.description,
          link: formValues.link,
          price: parseFloat(formValues.price),
          priority: formValues.priority,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error creating item:", error.response?.data || error);
    }
  }

  async function editItemInWishlist() {
    try {
      await axios.post(
        `${API_BASE_URL}/item/edit`,
        {
          itemId: id,
          name: formValues.name,
          desc: formValues.description,
          link: formValues.link,
          price: parseFloat(formValues.price),
          priority: formValues.priority,
        },
        { credential: true }
      );
    } catch (error) {
      console.error("Error editing item:", error.response?.data || error);
    }
  }

  async function handleAddItemSubmit() {
    await addItemToWishlist();
    setCurrentPage("wishlist");
    await refreshWishlist();
  }

  async function handleEditItemSubmit() {
    await editItemInWishlist();
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
        <Button
          name={type === "add" ? "Add Item" : "Save Changes"}
          style="submit-button"
          onClick={type === "add" ? handleAddItemSubmit : handleEditItemSubmit}
        />
      </div>
    </div>
  );
}

export default AddEditItem;
