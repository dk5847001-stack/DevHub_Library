import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
    faTwitter,
    faFacebook,
    faInstagram,
    faLinkedin,
    faTelegram,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <div className="w-full mt-4 p-4 min-h-60 bg-slate-100">
            <div className="flex justify-around">

                <div>
                    <img
                        src="/media/images/logo.svg"
                        alt="Zerodha"
                        className="h-4 w-auto"
                    />

                    <br />

                    <p className="text-xs text-gray-600">
                        © 2010 - 2027, Not Zerodha Broking Ltd.
                    </p>

                    <p className="text-xs text-gray-600">
                        All rights reserved.
                    </p>

                    <br />

                    <div className="flex gap-5 text-gray-600 text-lg">
                        <FontAwesomeIcon icon={faTwitter} />
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faLinkedin} />
                        <FontAwesomeIcon icon={faTelegram} />
                    </div>
                </div>
{/* ---------------------------------------------------------------------*/}
                <div className="flex gap-2 flex-col">
                    <p>Company</p>
                    <Link className="text-gray-500 hover:text-gray-700" to="/about">About</Link>
                    <Link className="text-gray-500 hover:text-gray-700" to="/products">Products</Link>
                    <Link className="text-gray-500 hover:text-gray-700" to="/pricing">Pricing</Link>
                    <Link className="text-gray-500 hover:text-gray-700" to="/about">Referral programme</Link>
                    <Link className="text-gray-500 hover:text-gray-700" to="/about">careers</Link>
                    <Link className="text-gray-500 hover:text-gray-700" to="/about">Zerodha.tech</Link>
                    <Link className="text-gray-500 hover:text-gray-700" to="/about">Press & media</Link>
                    <Link className="text-gray-500 hover:text-gray-700" to="/about">Zerodha cares ()CSR</Link>
                </div>
                {/* --------------------------------------------- */}
                <div className="flex flex-col gap-2">
                    <p>Support</p>
                    <Link className="text-gray-500 hover:text-gray-700" to="/contact">Contact</Link>
                    <Link className="text-gray-500 hover:text-gray-700" to="/contact">Support portal</Link>
                    <Link className="text-gray-500 hover:text-gray-700" to="/contact">S-Connect blog</Link>
                    <Link className="text-gray-500 hover:text-gray-700" to="/contact">List of charges</Link>
                    <Link className="text-gray-500 hover:text-gray-700" to="/contact">Downloads & resources</Link>
                </div>
                {/* -------------------------------------------------- */}
                <div className="flex flex-col gap-2">
                    <p>Account</p>
                    <Link className="text-gray-500 hover:text-gray-700" to="/contact">Open an account</Link>
                    <Link className="text-gray-500 hover:text-gray-700" to="/contact">Fund transfer</Link>
                    <Link className="text-gray-500 hover:text-gray-700" to="/contact">60 day challenge</Link>
                </div>
            </div>
            <p className="text-gray-700 py-1 mt-4 px-8 text-sm">Zerodha Broking Ltd.: Member of NSE & BSE – SEBI Registration no.: INZ000031633 CDSL: Depository services through Zerodha Securities Pvt. Ltd. – SEBI Registration no.: INZ000031633 Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration no.: INZ000038238 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to [complaints@zerodha.com](mailto:complaints@zerodha.com), for ensure you carefully read the Risk Disclosure Document as prescribed by SEBI ICF.</p>
            <p className="text-gray-700 py-1 px-8 text-sm">Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail. Communication, Speedy redressal of the grievances</p>
            <p className="text-gray-700 py-2 px-8 text-sm">Investments in securities market are subject to market risks; read all the related documents carefully before investing.</p>
        </div>
    );
}