import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  title: string;
  price: number;
}

const API_URL = "http://localhost:5001/api/products";

const Admin = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    if (!token) return;
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setProducts(data);
  };

  const addProduct = async () => {
    if (!title || price === "" || !token) return;
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
  };

  const deleteProduct = async (id: string) => {
    if (!token) return;
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchProducts();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button onClick={addProduct}>Add</button>
      </section>

      <section>
        <h2>Products</h2>
        {products.length === 0 && <p>No products</p>}
        {products.map((p) => (
          <div key={p._id} style={{ display: "flex", gap: "1rem" }}>
            <span>
              {p.title} — ${p.price}
            </span>
            <button onClick={() => deleteProduct(p._id)}>Delete</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Admin;
