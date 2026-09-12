import { useContext, useState } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const { closeBuyWindow } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleBuyClick = async () => {
    if (!uid) {
      alert("Stock UID is missing.");
      return;
    }

    if (Number(stockQuantity) <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    if (Number(stockPrice) <= 0) {
      alert("Price must be greater than 0.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/newOrder",
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "BUY",
        }
      );

      console.log("Order placed:", response.data);

      alert("Buy order placed successfully!");

      closeBuyWindow();
    } catch (error) {
      console.error("Order placement failed:", error);

      if (error.response) {
        console.error("Server response:", error.response.data);

        alert(
          error.response.data?.message ||
            "Failed to place order. Please try again."
        );
      } else if (error.request) {
        alert(
          "Server is not responding. Please make sure your backend is running."
        );
      } else {
        alert("Something went wrong while placing the order.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>

            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              step="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>

            <input
              type="number"
              name="price"
              id="price"
              min="0"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>
          Margin required ₹
          {(Number(stockQuantity) * Number(stockPrice)).toFixed(2)}
        </span>

        <div>
          <button
            type="button"
            className="btn btn-blue"
            onClick={handleBuyClick}
            disabled={loading}
          >
            {loading ? "Buying..." : "Buy"}
          </button>

          <button
            type="button"
            className="btn btn-grey"
            onClick={handleCancelClick}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;