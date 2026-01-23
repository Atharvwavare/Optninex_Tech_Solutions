import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



interface Product {
  _id: string;
  title: string;
  price: number;
}

const API_URL = "http://localhost:5001/api/products";

const Admin = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");

  // 🔐 Protect admin page
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  // 📦 Load products
  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const addProduct = async () => {
    if (!title || price === "" || !token) return;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, price }),
      });

      setTitle("");
      setPrice("");
      fetchProducts();
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!token) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Admin Dashboard
      </h1>

      {/* ADD PRODUCT */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded-lg"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
        />

        <button
          onClick={addProduct}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Products</h2>

        {products.length === 0 && (
          <p className="text-gray-500">No products available</p>
        )}

        <div className="space-y-3">
          {products.map((p) => (
            <div
              key={p._id}
              className="flex justify-between items-center border p-3 rounded-lg"
            >
              <span className="font-medium">
                {p.title} — ₹{p.price}
              </span>

              <button
                onClick={() => deleteProduct(p._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
