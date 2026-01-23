import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  name: string;
  image: string;
  specifications: string[];
}

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleSpecs = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-black max-w-2xl mx-auto">
            Choose the perfect solution for your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow flex flex-col"
                style={{ minHeight: "500px" }} // Optional: ensures uniform minimum height
              >
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-fit"
                />

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-black mb-4">
                    {product.name}
                  </h3>

                  {/* Specifications */}
                  <div className="mb-6 text-black flex flex-col flex-grow">
                    <ul
                      className={`space-y-3 transition-all duration-300 ease-in-out flex-grow ${
                        isExpanded
                          ? "overflow-auto max-h-72" // Scrollable when expanded
                          : "overflow-hidden max-h-40" // Collapsed state
                      }`}
                    >
                      {product.specifications.map((spec, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => toggleSpecs(index)}
                      className="mt-2 text-blue-600 font-semibold hover:underline self-start"
                    >
                      {isExpanded ? "Show Less" : "Learn More"}
                    </button>
                  </div>

                  {/* Shop Now Button */}
                  
<Link
  to="/shop"
  className="mt-auto w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow text-center"
>
  Shop Now
</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
