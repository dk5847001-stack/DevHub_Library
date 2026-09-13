import { useEffect, useState } from "react";

const Positions = () => {
    const [positions, setPositions] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                if (!API_URL) {
                    console.error(
                        "VITE_API_URL is not configured."
                    );
                    return;
                }

                const response = await fetch(
                    `${API_URL}/api/allPositions`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const data = await response.json();

                console.log("Positions:", data);

                if (response.ok && data.success) {
                    setPositions(data.allPositions);
                }
            } catch (err) {
                console.error(
                    "Positions fetch error:",
                    err
                );
            }
        };

        fetchPositions();
    }, [API_URL]);

    return (
        <>
            <h3 className="title">
                Positions ({positions.length})
            </h3>

            <div className="order-table">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Instrument</th>
                            <th>Qty.</th>
                            <th>Avg.</th>
                            <th>LTP</th>
                            <th>P&amp;L</th>
                            <th>Chg.</th>
                        </tr>
                    </thead>

                    <tbody>
                        {positions.map((stock, index) => {
                            const currValue =
                                stock.price * stock.qty;

                            const isProfit =
                                currValue -
                                    stock.avg * stock.qty >=
                                0;

                            const profClass = isProfit
                                ? "profit"
                                : "loss";

                            const dayClass = stock.isLoss
                                ? "loss"
                                : "profit";

                            return (
                                <tr key={index}>
                                    <td>{stock.product}</td>

                                    <td>{stock.name}</td>

                                    <td>{stock.qty}</td>

                                    <td>
                                        {stock.avg.toFixed(2)}
                                    </td>

                                    <td>
                                        {stock.price.toFixed(2)}
                                    </td>

                                    <td
                                        className={profClass}
                                    >
                                        {(
                                            currValue -
                                            stock.avg *
                                                stock.qty
                                        ).toFixed(2)}
                                    </td>

                                    <td
                                        className={dayClass}
                                    >
                                        {stock.day}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Positions;