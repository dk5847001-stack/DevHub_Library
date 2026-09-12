import { useContext, useState } from "react";

import { watchlist } from "../data/data";

import {
  BarChartOutlined,
  MoreHoriz,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";

import { Tooltip } from "@mui/material";

import GeneralContext from "./GeneralContext";

const WatchList = () => {
  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />

        <span className="counts">{watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchListActions, setShowWatchListActions] = useState(false);

  const handleMouseEnter = () => {
    setShowWatchListActions(true);
  };

  const handleMouseLeave = () => {
    setShowWatchListActions(false);
  };

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>
          {stock.name}
        </p>

        <span className="percent">
          {stock.percent}
        </span>

        {stock.isDown ? (
          <KeyboardArrowDown className="down" />
        ) : (
          <KeyboardArrowUp className="up" />
        )}

        <span className="price">
          {stock.price}
        </span>
      </div>

      {showWatchListActions && (
        <WatchListActions uid={stock.name} />
      )}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const { openBuyWindow } = useContext(GeneralContext);

  const handleBuyClick = () => {
    console.log("Buy clicked:", uid);

    openBuyWindow(uid);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
        >
          <button
            type="button"
            className="buy"
            onClick={handleBuyClick}
          >
            Buy
          </button>
        </Tooltip>

        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
        >
          <button
            type="button"
            className="sell"
          >
            Sell
          </button>
        </Tooltip>

        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
        >
          <button
            type="button"
            className="action"
          >
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>

        <Tooltip
          title="More"
          placement="top"
          arrow
        >
          <button
            type="button"
            className="action"
          >
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};