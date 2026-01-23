import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function BuyNowPage() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // Personal Information state
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
  });

  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState(""); // Simulated OTP
  const [otpVerified, setOtpVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Generate OTP (simulated)
  const sendOtp = () => {
    if (!/^\d{10}$/.test(form.mobile)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(generatedOtp);
    alert(`Your OTP is: ${generatedOtp}`); // In real app, send via SMS API
  };

  const verifyOtp = () => {
    if (otp === sentOtp) {
      setOtpVerified(true);
      alert("OTP Verified!");
    } else {
      alert("Invalid OTP");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpVerified) {
      alert("Please verify your mobile number first");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Buy Now</h1>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow p-6 flex flex-col gap-4"
          >
            <h2 className="text-2xl font-semibold mb-4">Enter Your Details</h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Mobile Input + OTP */}
            <div className="flex flex-col sm:flex-row gap-2 items-start">
              <input
                type="number"
                name="mobile"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
              />
              <button
                type="button"
                onClick={sendOtp}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Send OTP
              </button>
            </div>

            {sentOtp && !otpVerified && (
              <div className="flex flex-col sm:flex-row gap-2 items-start mt-2">
                <input
                  type="number"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                />
                <button
                  type="button"
                  onClick={verifyOtp}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Verify OTP
                </button>
              </div>
            )}

            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={!otpVerified} // Disable until OTP is verified
              className={`mt-4 px-6 py-3 rounded font-semibold text-white transition ${
                otpVerified
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-6">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
              <p><strong>Name:</strong> {form.name}</p>
              <p><strong>Email:</strong> {form.email}</p>
              <p><strong>Mobile:</strong> {form.mobile}</p>
              <p><strong>Address:</strong> {form.address}</p>
              <p><strong>Pincode:</strong> {form.pincode}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Products</h3>
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b py-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right mt-4 text-2xl font-bold">
              Total: ₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            </div>

            <button
              onClick={() => navigate("/shop")}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded transition"
            >
              Confirm & Go to Payment
              
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
