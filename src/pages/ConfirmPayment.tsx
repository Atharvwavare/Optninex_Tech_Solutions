// src/pages/ConfirmOrder.tsx

import { useLocation, useNavigate } from "react-router-dom";

export default function ConfirmOrder() {
  const navigate = useNavigate();
  const location = useLocation();

  const { customer, cartItems } = location.state || {};

  if (!customer || !cartItems) {
    navigate("/shop");
    return null;
  }

  const total = cartItems.reduce(
    (sum: number, i: any) => sum + i.price * i.quantity,
    0
  );


  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDE - DETAILS */}
        <div className="lg:col-span-2 space-y-6">

          {/* CUSTOMER INFO */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Customer Information</h2>
              <button
                onClick={() => navigate(-1)}
                className="text-blue-600 text-sm hover:underline"
              >
                Edit
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-black">
              <p><strong>Name:</strong> {customer.name}</p>
              <p><strong>Email:</strong> {customer.email}</p>
              <p><strong>Mobile:</strong> {customer.mobile}</p>
              {customer.gst && (
                <p><strong>GST Number:</strong> {customer.gst}</p>
              )}
            </div>
          </div>

          {/* ADDRESSES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* BILLING */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Billing Address</h3>
              <p className="text-black whitespace-pre-line leading-relaxed">
                {customer.billingAddress}
              </p>
            </div>

            {/* SHIPPING */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>
              <p className="text-black whitespace-pre-line leading-relaxed">
                {customer.shippingAddress}
              </p>
            </div>

          </div>

          {/* PRODUCTS */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
  <h3 className="text-lg font-semibold mb-4">Order Items</h3>

  {cartItems.map((item: any) => (
    <div
      key={item.id}
      className="flex flex-col sm:flex-row gap-4 border-b py-4 last:border-b-0"
    >
      {/* IMAGE */}
      <div className="flex justify-center sm:justify-start">
        <img
          src={item.image}
          className="w-24 h-24 sm:w-20 sm:h-20 object-contain border rounded"
        />
      </div>

      {/* DETAILS */}
      <div className="flex-1 text-center sm:text-left">
        <p className="font-medium line-clamp-2">{item.name}</p>
        <p className="text-sm text-gray-600 mt-1">
          Quantity: {item.quantity}
        </p>
      </div>

      {/* PRICE */}
      <div className="text-center sm:text-right font-semibold text-gray-900">
        ₹{item.price * item.quantity}
      </div>
    </div>
  ))}
</div>

        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-lg shadow h-fit sticky top-24">

          <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-600">Free</span>
            </div>

            {customer.gst && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>GST Applied</span>
                <span>As per invoice</span>
              </div>
            )}

            <hr />

            <div className="flex justify-between text-lg font-bold">
              <span>Total Payable</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-6 space-y-3">
           <button
  onClick={() =>
    navigate("/payment", {
      state: {
        totalAmount: total,
        customer,
        cartItems,
      },
    })
  }
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold"
>
  Proceed to Payment
</button>

            <button
              onClick={() => navigate("/cart")}
              className="w-full border py-2 rounded hover:bg-gray-50"
            >
              Back to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
