import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const divisions = {
  Dhaka: ["Dhaka", "Faridpur", "Gazipur", "Kishoreganj", "Gopalganj", "Madaripur"],
  Chattogram: ["Comilla", "Cox's Bazar", "Feni", "Chandpur", "Rangamati"],
  Rajshahi: ["Bogura", "Joypurhat", "Naogaon", "Natore", "Pabna", "Rajshahi"],
  Khulna: ["Bagerhat", "Chuadanga", "Jashore", "Khulna", "Kushtia", "Meherpur"],
  Barisal: ["Barisal", "Barguna", "Bhola", "Jhalokathi", "Patuakhali", "Pirojpur"],
  Sylhet: ["Sylhet", "Habiganj", "Moulvibazar", "Sunamganj"],
  Rangpur: ["Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Rangpur", "Thakurgaon"],
  Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
};

const AddParcel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    division: "",
    district: "",
    weight: "",
    type: "",
    dimensions: "",
    deliverySpeed: "standard",
    insurance: false,
    pickupDate: "",
    receiverName: "",
    receiverAddress: "",
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
    const parcel = { ...form, email: user?.email, status: "Pending" };

    try {
      await axios.post("https://quickgoo1.vercel.app/parcels", parcel);
      setForm({
        name: "",
        phone: "",
        address: "",
        division: "",
        district: "",
        weight: "",
        type: "",
        dimensions: "",
        deliverySpeed: "standard",
        insurance: false,
        pickupDate: "",
        receiverName: "",
        receiverAddress: "",
      });
      Swal.fire("Parcel added successfully!");
      navigate('/my-percels');
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to add parcel. Please try again.", "error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 md:px-12">
      <Helmet>
        <title>QuickGoo | Add Parcel</title>
      </Helmet>
      <h2 className="text-3xl font-extrabold text-center mb-6 text-green-700">Add Your Parcel</h2>
      <p className="text-center text-gray-600 mb-10">Provide parcel details for smooth delivery</p>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Parcel Information Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Parcel Information</h3>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-4 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="Parcel Type (e.g., Electronics, Books)"
          />

          <div className="flex flex-col md:flex-row gap-4 mb-5">
            <input
              name="weight"
              value={form.weight}
              onChange={handleChange}
              className="w-full md:w-1/2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              type="number"
              placeholder="Weight (kg)"
            />
            <input
              name="dimensions"
              value={form.dimensions}
              onChange={handleChange}
              className="w-full md:w-1/2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              placeholder="Dimensions (LxWxH)"
            />
          </div>

        

          </div>

        {/* Receiver Information Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Receiver Details</h3>
          <div className="flex flex-col md:flex-row gap-4 mb-5">
          <input
            name="receiverName"
            value={form.receiverName}
            onChange={handleChange}
            className="w-full p-4 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="Receiver Name"
          />
          <textarea
            name="receiverAddress"
            value={form.receiverAddress}
            onChange={handleChange}
            className="w-full p-4 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Receiver's Phone Number"
          />

          </div>
          


<div className="flex flex-col md:flex-row gap-4 mb-5">
            <select
              name="division"
              value={form.division}
              onChange={handleChange}
              className="w-full md:w-1/2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select Division</option>
              {Object.keys(divisions).map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
            <select
              name="district"
              value={form.district}
              onChange={handleChange}
              className="w-full md:w-1/2 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={!form.division}
            >
              <option value="">Select District</option>
              {form.division &&
                divisions[form.division].map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
            </select>
          </div>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-4 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="Full Pickup Address"
          />
        </div>
        

        {/* Additional Options Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Additional Options</h3>
          <input
            name="pickupDate"
            value={form.pickupDate}
            onChange={handleChange}
            className="w-full p-4 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            type="date"
          />
          <div className="flex flex-wrap gap-6 mb-5">
            {["standard", "express", "sameDay"].map((speed) => (
              <label key={speed} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="deliverySpeed"
                  value={speed}
                  checked={form.deliverySpeed === speed}
                  onChange={handleChange}
                  className="text-green-500 focus:ring-2 focus:ring-green-500"
                />
                <span className="capitalize">{speed === "sameDay" ? "Same Day" : speed}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="w-full sm:w-1/2 bg-green-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Add Parcel
          </button>
          <button
            type="reset"
            onClick={() =>
              setForm({
                name: "",
                phone: "",
                address: "",
                division: "",
                district: "",
                weight: "",
                type: "",
                dimensions: "",
                deliverySpeed: "standard",
                insurance: false,
                pickupDate: "",
                receiverName: "",
                receiverAddress: "",
              })
            }
            className="w-full sm:w-1/2 bg-gray-300 text-gray-700 py-4 rounded-lg text-lg font-semibold hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddParcel;
