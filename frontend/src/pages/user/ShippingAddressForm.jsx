import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setShippingAddress } from "../../redux/checkoutSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const ShippingAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const shippingData = { address, city, pincode, country };
    dispatch(setShippingAddress(shippingData)); // ✅ Save to Redux
    navigate("/user/payment"); // ✅ Go to Payment Page
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-md mx-auto mt-50 p-5 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-[#E69138] text-white p-2 rounded">
          Continue to Payment
        </button>
      </form>
    </div>
    </>
  );
};

export default ShippingAddressForm;
