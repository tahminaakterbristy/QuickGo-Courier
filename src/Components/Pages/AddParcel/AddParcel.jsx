import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddParcel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    weight: "",
    type: "",
    dimensions: "",
    deliverySpeed: "standard", 
    insurance: false,
    pickupDate: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parcel = { ...form, email: user.email };
    try {
      await axios.post("http://localhost:6077/parcels", parcel);
      setForm({
        name: "",
        phone: "",
        address: "",
        weight: "",
        type: "",
        dimensions: "",
        deliverySpeed: "standard",
        insurance: false,
        pickupDate: "",
      });
      Swal.fire("Parcel added successfully!");
      navigate('/my-percels')
    } catch (error) {
      alert("Error adding parcel.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-4">Add Your Parcel</h2>
      <p className="text-center text-gray-600 mb-8">
        Please provide parcel details for smooth delivery
      </p>

      {/* Form Starts */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Parcel Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Parcel Information</h3>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="Parcel Name (e.g., Electronics, Books)"
          />
          <div className="flex gap-4">
            <input
              name="weight"
              value={form.weight}
              onChange={handleChange}
              className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              type="number"
              placeholder="Weight (kg)"
            />
            <input
              name="dimensions"
              value={form.dimensions}
              onChange={handleChange}
              className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              placeholder="Dimensions (LxWxH)"
            />
          </div>
        </div>

        {/* Sender and Receiver Information Section */}
        <div className="flex gap-8">
          {/* Sender Info */}
          <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Sender Details</h3>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              placeholder="Sender Phone"
            />
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Sender Address"
            />
          </div>

          {/* Receiver Info */}
          <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Receiver Details</h3>
            <input
              name="receiverName"
              value={form.receiverName || ""}
              onChange={handleChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              placeholder="Receiver Name"
            />
            <textarea
              name="receiverAddress"
              value={form.receiverAddress || ""}
              onChange={handleChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Receiver Address"
            />
          </div>
        </div>

        {/* Additional Options Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Options</h3>
          <input
            name="pickupDate"
            value={form.pickupDate}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            type="date"
          />
          <div className="flex gap-4 mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="deliverySpeed"
                value="standard"
                checked={form.deliverySpeed === "standard"}
                onChange={handleChange}
                className="text-green-500 focus:ring-2 focus:ring-green-500"
              />
              <span>Standard</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="deliverySpeed"
                value="express"
                checked={form.deliverySpeed === "express"}
                onChange={handleChange}
                className="text-green-500 focus:ring-2 focus:ring-green-500"
              />
              <span>Express</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="deliverySpeed"
                value="sameDay"
                checked={form.deliverySpeed === "sameDay"}
                onChange={handleChange}
                className="text-green-500 focus:ring-2 focus:ring-green-500"
              />
              <span>Same Day</span>
            </label>
          </div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="insurance"
              checked={form.insurance}
              onChange={handleChange}
              className="text-green-500 focus:ring-2 focus:ring-green-500"
            />
            <span>Add Insurance</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center space-x-2">
          <button
            type="submit"
            className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg font-semibold w-1/2 hover:bg-green-600 transition-colors duration-300"
          >
            Add Parcel
          </button>
          <button
            type="reset"
            onClick={() => setForm({
              name: "",
              phone: "",
              address: "",
              weight: "",
              type: "",
              dimensions: "",
              deliverySpeed: "standard",
              insurance: false,
              pickupDate: "",
            })}
            className="bg-gray-300 text-gray-700 py-3 px-6 rounded-lg text-lg font-semibold w-1/2 hover:bg-gray-400 transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddParcel;
