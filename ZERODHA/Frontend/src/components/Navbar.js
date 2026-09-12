import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import {
    faBars,
    faHouse,
    faBoxOpen,
    faIndianRupeeSign,
    faAddressBook,
    faCircleInfo,
    faUserPlus,
    faRightToBracket,
    faRightFromBracket,
    faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";

const navigation = [
    {
        name: "Home",
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
];

export default function Navbar() {
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);

    // =========================================
    // CHECK AUTHENTICATION
    // =========================================

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/auth/check",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const data = await response.json();

                if (response.ok && data.success) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error(
                    "Authentication check failed:",
                    error
                );

                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuthentication();
    }, []);

    // =========================================
    // DASHBOARD
    // =========================================

    const handleDashboardClick = () => {
        window.location.replace("http://localhost:5173");
    };

    // =========================================
    // LOGOUT
    // =========================================

    const handleLogout = async () => {
        try {
            setLogoutLoading(true);

            const response = await fetch(
                "http://localhost:3000/logout",
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                setIsAuthenticated(false);
                setMobileMenuOpen(false);

                // Redirect to Login page
                navigate("/login", {
                    replace: true,
                });
            } else {
                alert(
                    data.message ||
                        "Logout failed!"
                );
            }
        } catch (error) {
            console.error(
                "Logout failed:",
                error
            );

            alert(
                "Unable to logout. Please try again."
            );
        } finally {
            setLogoutLoading(false);
        }
    };

    // =========================================
    // MOBILE MENU
    // =========================================

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">

            {/* =========================================
                MAIN NAVBAR
            ========================================= */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="h-16 flex items-center justify-between">

                    {/* =========================================
                        LOGO
                    ========================================= */}

                    <Link
                        to="/"
                        onClick={closeMobileMenu}
                        className="flex items-center"
                    >
                        <img
                            src="/media/images/logo.svg"
                            alt="Zerodha"
                            className="h-8 w-auto"
                        />
                    </Link>

                    {/* =========================================
                        DESKTOP NAVIGATION
                    ========================================= */}

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

                                <span>
                                    {item.name}
                                </span>
                            </Link>
                        ))}

                        {/* =========================================
                            AUTHENTICATED USER
                        ========================================= */}

                        {!loading && isAuthenticated && (
                            <>
                                {/* Dashboard */}

                                <button
                                    type="button"
                                    onClick={
                                        handleDashboardClick
                                    }
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
                                        icon={faGaugeHigh}
                                        className="text-sm"
                                    />

                                    <span>
                                        Dashboard
                                    </span>
                                </button>

                                {/* Logout */}

                                <button
                                    type="button"
                                    onClick={
                                        handleLogout
                                    }
                                    disabled={
                                        logoutLoading
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        text-sm
                                        font-medium
                                        text-gray-600
                                        hover:text-red-600
                                        disabled:opacity-50
                                        disabled:cursor-not-allowed
                                        transition-all
                                        duration-200
                                    "
                                >
                                    <FontAwesomeIcon
                                        icon={
                                            faRightFromBracket
                                        }
                                        className="text-sm"
                                    />

                                    <span>
                                        {logoutLoading
                                            ? "Logging out..."
                                            : "Logout"}
                                    </span>
                                </button>
                            </>
                        )}

                        {/* =========================================
                            NOT AUTHENTICATED USER
                        ========================================= */}

                        {!loading &&
                            !isAuthenticated && (
                                <>
                                    {/* Signup */}

                                    <Link
                                        to="/signup"
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
                                            icon={faUserPlus}
                                            className="text-sm"
                                        />

                                        <span>
                                            Signup
                                        </span>
                                    </Link>

                                    {/* Login */}

                                    <Link
                                        to="/login"
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
                                            icon={
                                                faRightToBracket
                                            }
                                            className="text-sm"
                                        />

                                        <span>
                                            Login
                                        </span>
                                    </Link>
                                </>
                            )}
                    </div>

                    {/* =========================================
                        MOBILE MENU BUTTON
                    ========================================= */}

                    <button
                        type="button"
                        aria-label={
                            mobileMenuOpen
                                ? "Close menu"
                                : "Open menu"
                        }
                        aria-expanded={
                            mobileMenuOpen
                        }
                        onClick={() =>
                            setMobileMenuOpen(
                                (previous) =>
                                    !previous
                            )
                        }
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

            {/* =========================================
                MOBILE MENU
            ========================================= */}

            {mobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white">

                    <div className="px-4 py-4 space-y-1">

                        {/* Main Navigation */}

                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={
                                    closeMobileMenu
                                }
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    px-3
                                    py-3
                                    rounded-lg
                                    text-sm
                                    font-medium
                                    text-gray-600
                                    hover:text-gray-900
                                    hover:bg-gray-50
                                    transition-all
                                    duration-200
                                "
                            >
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className="w-4"
                                />

                                <span>
                                    {item.name}
                                </span>
                            </Link>
                        ))}

                        {/* =========================================
                            MOBILE AUTHENTICATION
                        ========================================= */}

                        {!loading && (
                            <div className="pt-2 border-t border-gray-100">

                                {isAuthenticated ? (
                                    <>
                                        {/* Dashboard */}

                                        <button
                                            type="button"
                                            onClick={() => {
                                                closeMobileMenu();
                                                handleDashboardClick();
                                            }}
                                            className="
                                                w-full
                                                flex
                                                items-center
                                                gap-3
                                                px-3
                                                py-3
                                                rounded-lg
                                                text-sm
                                                font-medium
                                                text-gray-600
                                                hover:text-gray-900
                                                hover:bg-gray-50
                                                transition-all
                                                duration-200
                                            "
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    faGaugeHigh
                                                }
                                                className="w-4"
                                            />

                                            <span>
                                                Dashboard
                                            </span>
                                        </button>

                                        {/* Logout */}

                                        <button
                                            type="button"
                                            onClick={
                                                handleLogout
                                            }
                                            disabled={
                                                logoutLoading
                                            }
                                            className="
                                                w-full
                                                flex
                                                items-center
                                                gap-3
                                                px-3
                                                py-3
                                                rounded-lg
                                                text-sm
                                                font-medium
                                                text-gray-600
                                                hover:text-red-600
                                                hover:bg-gray-50
                                                disabled:opacity-50
                                                disabled:cursor-not-allowed
                                                transition-all
                                                duration-200
                                            "
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    faRightFromBracket
                                                }
                                                className="w-4"
                                            />

                                            <span>
                                                {logoutLoading
                                                    ? "Logging out..."
                                                    : "Logout"}
                                            </span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {/* Signup */}

                                        <Link
                                            to="/signup"
                                            onClick={
                                                closeMobileMenu
                                            }
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                                px-3
                                                py-3
                                                rounded-lg
                                                text-sm
                                                font-medium
                                                text-gray-600
                                                hover:text-gray-900
                                                hover:bg-gray-50
                                                transition-all
                                                duration-200
                                            "
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    faUserPlus
                                                }
                                                className="w-4"
                                            />

                                            <span>
                                                Signup
                                            </span>
                                        </Link>

                                        {/* Login */}

                                        <Link
                                            to="/login"
                                            onClick={
                                                closeMobileMenu
                                            }
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                                px-3
                                                py-3
                                                rounded-lg
                                                text-sm
                                                font-medium
                                                text-gray-600
                                                hover:text-gray-900
                                                hover:bg-gray-50
                                                transition-all
                                                duration-200
                                            "
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    faRightToBracket
                                                }
                                                className="w-4"
                                            />

                                            <span>
                                                Login
                                            </span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}