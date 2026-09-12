// import { positions } from "../data/data";
import { useEffect, useState } from "react";
const Positions = () => {
  const [positions, setPositions] = useState([]);
    useEffect(()=>{
      const fetchHoldings = async () => {
        try{
          const response = await fetch("http://localhost:3000/api/allPositions",
            {
              method: "GET",
            }
          );
          const data = await response.json();
          console.log(data);
          if(response.ok && data.success){
            setPositions(data.allPositions);
          }
        }catch(err){
          console.log(err)
        }
      };
      fetchHoldings();
    }, []);
  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

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
              const currValue = stock.price * stock.qty;
              const isProfit = currValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index} >
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>{(currValue - stock.avg * stock.qty).toFixed(2)}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
