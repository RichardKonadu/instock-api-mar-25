import { parsePhoneNumber } from "libphonenumber-js/min";

function validateWarehouseForm(data) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !data.warehouse_name ||
    !data.address ||
    !data.city ||
    !data.country ||
    !data.contact_name ||
    !data.contact_position ||
    !data.contact_phone ||
    !data.contact_email
  ) {
    return {
      success: false,
      error: "All fields are required and cannot be empty.",
    };
  }

  if (!emailRegex.test(data.contact_email)) {
    return { success: false, error: "Invalid email format." };
  }

  if (!parsePhoneNumber(`${data.contact_phone}`, "US").isValid()) {
    return { success: false, error: "Invalid phone number format." };
  }

  return { success: true, data: data };
}

const validateInventoryForm = (data) => {
  if (
    !data.warehouse_id ||
    !data.item_name ||
    !data.description ||
    !data.category ||
    !data.status ||
    !data.quantity
  ) {
    return {
      success: false,
      error: "All fields are required and cannot be empty.",
    };
  }

  return { success: true, data: data };
};

export { validateWarehouseForm, validateInventoryForm };
