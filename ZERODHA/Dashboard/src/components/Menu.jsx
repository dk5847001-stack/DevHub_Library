import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Menu = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);

    // ==============================
    // Check Authentication
    // ==============================
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/auth/check",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const data = await response.json();

                if (response.ok && data.success && data.authenticated) {
                    setUser(data.user);
                } else {
                    window.location.replace("http://localhost:5174/login");
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                window.location.replace("http://localhost:5174/login");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // ==============================
    // Logout
    // ==============================
    const handleLogout = async () => {
        if (logoutLoading) return;

        try {
            setLogoutLoading(true);

            const response = await fetch("http://localhost:3000/logout", {
                method: "POST",
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok && data.success) {
                window.location.replace("http://localhost:5174/login");
            } else {
                alert(data.message || "Logout failed");
            }
        } catch (error) {
            console.error("Logout error:", error);
            alert("Unable to logout. Please try again.");
        } finally {
            setLogoutLoading(false);
        }
    };

    // ==============================
    // User Name
    // ==============================
    const userName =
        user?.name ||
        user?.username ||
        user?.email?.split("@")[0] ||
        "USER";

    // ==============================
    // User Initials
    // ==============================
    const getInitials = (name) => {
        if (!name) return "U";

        const words = name.trim().split(" ");

        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase();
        }

        return (
            words[0].charAt(0) +
            words[words.length - 1].charAt(0)
        ).toUpperCase();
    };

    const initials = getInitials(userName);

    // ==============================
    // Active Menu
    // ==============================
    const isActive = (path) => {
        return location.pathname === path;
    };

    if (loading) {
        return (
            <div className="h-[70px] w-full border-b border-gray-200 bg-white flex items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-red-500"></div>
            </div>
        );
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">

            <div className="mx-auto flex h-[70px] w-full items-center justify-between px-5 md:px-8 lg:px-10">

                {/* ==============================
                    Logo
                ============================== */}
                <Link
                    to="/"
                    className="flex items-center shrink-0"
                    onClick={() => setIsProfileDropdownOpen(false)}
                >
                    <img
                        src="/icon.png"
                        alt="Zerodha Logo"
                        className="h-10 w-10 object-contain"
                    />
                </Link>

                {/* ==============================
                    Desktop Navigation
                ============================== */}
                <nav className="hidden md:flex items-center gap-1">

                    <Link
                        to="/"
                        className={`px-4 py-2 text-sm transition-colors ${
                            isActive("/")
                                ? "text-red-500"
                                : "text-gray-700 hover:text-red-500"
                        }`}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/orders"
                        className={`px-4 py-2 text-sm transition-colors ${
                            isActive("/orders")
                                ? "text-red-500"
                                : "text-gray-700 hover:text-red-500"
                        }`}
                    >
                        Orders
                    </Link>

                    <Link
                        to="/holdings"
                        className={`px-4 py-2 text-sm transition-colors ${
                            isActive("/holdings")
                                ? "text-red-500"
                                : "text-gray-700 hover:text-red-500"
                        }`}
                    >
                        Holdings
                    </Link>

                    <Link
                        to="/positions"
                        className={`px-4 py-2 text-sm transition-colors ${
                            isActive("/positions")
                                ? "text-red-500"
                                : "text-gray-700 hover:text-red-500"
                        }`}
                    >
                        Positions
                    </Link>

                    <Link
                        to="/funds"
                        className={`px-4 py-2 text-sm transition-colors ${
                            isActive("/funds")
                                ? "text-red-500"
                                : "text-gray-700 hover:text-red-500"
                        }`}
                    >
                        Funds
                    </Link>

                    <Link
                        to="/apps"
                        className={`px-4 py-2 text-sm transition-colors ${
                            isActive("/apps")
                                ? "text-red-500"
                                : "text-gray-700 hover:text-red-500"
                        }`}
                    >
                        Apps
                    </Link>
                </nav>

                {/* ==============================
                    Profile Section
                ============================== */}
                <div className="relative shrink-0">

                    <button
                        type="button"
                        onClick={() =>
                            setIsProfileDropdownOpen((prev) => !prev)
                        }
                        className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50"
                    >
                        {/* Avatar */}
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-xs font-medium text-purple-500">
                            {initials}
                        </div>

                        {/* Name */}
                        <span className="hidden lg:block max-w-[150px] truncate text-sm text-gray-700">
                            {userName}
                        </span>

                        {/* Arrow */}
                        <svg
                            className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                                isProfileDropdownOpen
                                    ? "rotate-180"
                                    : ""
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {/* ==============================
                        Profile Dropdown
                    ============================== */}
                    {isProfileDropdownOpen && (
                        <>
                            {/* Overlay for mobile / outside click */}
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() =>
                                    setIsProfileDropdownOpen(false)
                                }
                            />

                            <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">

                                {/* User Information */}
                                <div className="border-b border-gray-100 px-4 py-4">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-500">
                                            {initials}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-gray-800">
                                                {userName}
                                            </p>

                                            <p className="truncate text-xs text-gray-500">
                                                {user?.email || "User Account"}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                {/* Dropdown Items */}
                                <div className="p-2">

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsProfileDropdownOpen(false);
                                            navigate("/profile");
                                        }}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-red-500"
                                    >
                                        <span className="text-base">
                                            👤
                                        </span>

                                        <span>Profile</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsProfileDropdownOpen(false);
                                            navigate("/settings");
                                        }}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-red-500"
                                    >
                                        <span className="text-base">
                                            ⚙️
                                        </span>

                                        <span>Settings</span>
                                    </button>

                                    <div className="my-1 border-t border-gray-100" />

                                    <button
                                        type="button"
                                        disabled={logoutLoading}
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <span className="text-base">
                                            {logoutLoading ? "⏳" : "↪"}
                                        </span>

                                        <span>
                                            {logoutLoading
                                                ? "Logging out..."
                                                : "Logout"}
                                        </span>
                                    </button>

                                </div>
                            </div>
                        </>
                    )}
                </div>

            </div>

            {/* ==============================
                Mobile Navigation
            ============================== */}
            <div className="border-t border-gray-100 md:hidden">

                <nav className="flex overflow-x-auto px-3 py-2">

                    <Link
                        to="/"
                        className={`whitespace-nowrap rounded-md px-3 py-2 text-xs ${
                            isActive("/")
                                ? "bg-red-50 text-red-500"
                                : "text-gray-600"
                        }`}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/orders"
                        className={`whitespace-nowrap rounded-md px-3 py-2 text-xs ${
                            isActive("/orders")
                                ? "bg-red-50 text-red-500"
                                : "text-gray-600"
                        }`}
                    >
                        Orders
                    </Link>

                    <Link
                        to="/holdings"
                        className={`whitespace-nowrap rounded-md px-3 py-2 text-xs ${
                            isActive("/holdings")
                                ? "bg-red-50 text-red-500"
                                : "text-gray-600"
                        }`}
                    >
                        Holdings
                    </Link>

                    <Link
                        to="/positions"
                        className={`whitespace-nowrap rounded-md px-3 py-2 text-xs ${
                            isActive("/positions")
                                ? "bg-red-50 text-red-500"
                                : "text-gray-600"
                        }`}
                    >
                        Positions
                    </Link>

                    <Link
                        to="/funds"
                        className={`whitespace-nowrap rounded-md px-3 py-2 text-xs ${
                            isActive("/funds")
                                ? "bg-red-50 text-red-500"
                                : "text-gray-600"
                        }`}
                    >
                        Funds
                    </Link>

                    <Link
                        to="/apps"
                        className={`whitespace-nowrap rounded-md px-3 py-2 text-xs ${
                            isActive("/apps")
                                ? "bg-red-50 text-red-500"
                                : "text-gray-600"
                        }`}
                    >
                        Apps
                    </Link>

                </nav>

            </div>

        </header>
    );
};

export default Menu;