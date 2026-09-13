import { useEffect, useState } from "react";
import { VerticalChartGraph } from "./VerticalChartGraph";

const Holdings = () => {
    const [holdings, setHoldings] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchHoldings = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/allHoldings`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const data = await response.json();

                console.log("Holdings:", data);

                if (response.ok && data.success) {
                    setHoldings(data.allHoldings);
                }
            } catch (err) {
                console.error("Holdings fetch error:", err);
            }
        };

        fetchHoldings();
    }, [API_URL]);

    const labels = holdings.map((stock) => stock.name);

    const data = {
        labels,
        datasets: [
            {
                label: "Stock Name",
                data: holdings.map((stock) => stock.price),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    return (
        <>
            <h3 className="title">
                Holdings ({holdings.length})
            </h3>

            <div className="order-table">
                <table>
                    <thead>
                        <tr>
                            <th>Instrument</th>
                            <th>Qty.</th>
                            <th>Avg. cost</th>
                            <th>LTP</th>
                            <th>Cur. val</th>
                            <th>P&L</th>
                            <th>Net chg.</th>
                            <th>Day chg.</th>
                        </tr>
                    </thead>

                    <tbody>
                        {holdings.map((stock, index) => {
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
                                    <td>{stock.name}</td>
                                    <td>{stock.qty}</td>
                                    <td>{stock.avg.toFixed(2)}</td>
                                    <td>{stock.price.toFixed(2)}</td>
                                    <td>{currValue.toFixed(2)}</td>

                                    <td className={profClass}>
                                        {(
                                            currValue -
                                            stock.avg * stock.qty
                                        ).toFixed(2)}
                                    </td>

                                    <td className={profClass}>
                                        {stock.net}
                                    </td>

                                    <td className={dayClass}>
                                        {stock.day}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="row">
                <div className="col">
                    <h5>
                        29,875.<span>55</span>
                    </h5>
                    <p>Total investment</p>
                </div>

                <div className="col">
                    <h5>
                        31,428.<span>95</span>
                    </h5>
                    <p>Current value</p>
                </div>

                <div className="col">
                    <h5>
                        1,553.40 (+5.20%)
                    </h5>
                    <p>P&amp;L</p>
                </div>
            </div>

            <VerticalChartGraph data={data} />
        </>
    );
};

export default Holdings;