import { Link } from "react-router-dom"
export default function Team() {
    return (
        <div>
            <h2 className="text-3xl font-semibold mb-8 text-center">People</h2><br />
            <div className="flex px-32 justify-around">
                <div className="flex flex-col items-center">
                    <img className="w-100" src="/media/images/dk4.png" />
                    <p className="text-xl font-semibold text-gray-500">Dilkhush Kumar</p>
                    <p className="text-gray-500">Founder, CEO</p>
                </div>

                <div className="w-1/4">
                    <p className="text-gray-500">
                        Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader.
                        Today, Zerodha has changed the landscape of the Indian broking industry.
                    </p><br />
                    <p className="text-gray-500">
                        He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).
                    </p><br />
                    <p className="text-gray-500">
                        Playing basketball is his zen.
                    </p><br />
                    <p className="text-gray-500">
                        Connect on <Link className="text-blue-600" to="/">Homepage</Link> / <Link className="text-blue-600" to="/">TradingQnA</Link>  / <Link className="text-blue-600" to="/">Twitter</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}