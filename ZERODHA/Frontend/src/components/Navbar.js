import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faBars,
    faHouse,
    faBoxOpen,
    faIndianRupeeSign,
    faAddressBook,
    faCircleInfo,
    faUserPlus,
    faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const navigation = [
    {
        name: "Dashboard",
        href: "/",
        icon: faHouse,
    },
    {
        name: "Products",
        href: "/products",
        icon: faBoxOpen,
    },
    {
        name: "Pricing",
        href: "/pricing",
        icon: faIndianRupeeSign,
    },
    {
        name: "About Us",
        href: "/about",
        icon: faCircleInfo,
    },
    {
        name: "Support",
        href: "/support",
        icon: faCircleInfo,
    },
    {
        name: "Contact Us",
        href: "/contact",
        icon: faAddressBook,
    },
    {
        name: "Signup",
        href: "/signup",
        icon: faUserPlus,
    },
    {
        name: "Login",
        href: "/login",
        icon: faRightToBracket,
    },
];

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src="/media/images/logo.svg"
                            alt="Zerodha"
                            className="h-8 w-auto"
                        />
                    </Link>

                    {/* Navigation */}
                    <div className="hidden md:flex items-center gap-7">

                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-medium
                                    text-gray-600
                                    hover:text-gray-900
                                    transition-all
                                    duration-200
                                "
                            >
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className="text-sm"
                                />

                                <span>{item.name}</span>
                            </Link>
                        ))}

                    </div>

                    {/* Mobile Menu Icon */}
                    <button
                        type="button"
                        aria-label="Open menu"
                        className="
                            md:hidden
                            flex
                            items-center
                            justify-center
                            w-10
                            h-10
                            rounded-lg
                            text-gray-600
                            hover:text-gray-900
                            hover:bg-gray-100
                            transition-all
                            duration-200
                        "
                    >
                        <FontAwesomeIcon
                            icon={faBars}
                            className="text-lg"
                        />
                    </button>

                </div>

            </div>

        </nav>
    );
}