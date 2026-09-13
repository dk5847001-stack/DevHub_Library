import { useState } from "react";

import {
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Login() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (event) => {
        setFormData((previousData) => ({
            ...previousData,
            [event.target.name]: event.target.value,
        }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            console.log("Login response:", data);

            if (response.ok && data.success) {
                setMessage(data.message);

                setFormData({
                    email: "",
                    password: "",
                });

                setTimeout(() => {
                    /*
                     * Development:
                     * http://localhost:5173
                     *
                     * Production:
                     * VITE_DASHBOARD_URL
                     */

                    const dashboardURL =
                        import.meta.env.VITE_DASHBOARD_URL ||
                        "http://localhost:5173";

                    window.location.replace(dashboardURL);
                }, 1000);
            } else {
                setMessage(data.message || "Login failed!");
            }
        } catch (err) {
            console.error("Login error:", err);

            setMessage(
                err.message || "Something went wrong!"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
            {/* Main Container */}

            <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center justify-center">
                <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.08)] lg:grid-cols-2">

                    {/* =========================================
                        LEFT SIDE
                    ========================================= */}

                    <div className="hidden bg-gray-50 p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">
                        <div>

                            {/* Logo */}

                            <div className="mb-12 flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500 text-xl font-bold text-white shadow-sm">
                                    Z
                                </div>

                                <div>
                                    <p className="text-lg font-semibold tracking-tight text-gray-900">
                                        Zerodha
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Trading Platform
                                    </p>
                                </div>
                            </div>

                            {/* Heading */}

                            <h1 className="max-w-md text-4xl font-semibold leading-tight tracking-tight text-gray-900 xl:text-5xl">
                                Welcome
                                <span className="block text-red-500">
                                    back.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-md text-sm leading-7 text-gray-500">
                                Sign in to continue to your account and
                                manage your investments from one simple
                                dashboard.
                            </p>
                        </div>

                        {/* Bottom Info */}

                        <div className="mt-10">
                            <div className="rounded-2xl border border-gray-200 bg-white p-5">
                                <p className="text-sm font-medium text-gray-800">
                                    Simple. Secure. Powerful.
                                </p>

                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Everything you need for a smooth trading
                                    experience.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* =========================================
                        RIGHT SIDE - LOGIN FORM
                    ========================================= */}

                    <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12 xl:p-14">
                        <div className="w-full max-w-md">

                            {/* Mobile Logo */}

                            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-lg font-bold text-white">
                                    Z
                                </div>

                                <span className="text-lg font-semibold text-gray-900">
                                    Zerodha
                                </span>
                            </div>

                            {/* Header */}

                            <div className="mb-8">
                                <p className="mb-2 text-sm font-medium text-red-500">
                                    WELCOME BACK
                                </p>

                                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
                                    Sign in
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    Enter your credentials to access your
                                    account.
                                </p>
                            </div>

                            {/* Form */}

                            <form
                                onSubmit={handleFormSubmit}
                                className="flex flex-col gap-5"
                            >

                                {/* Email */}

                                <TextField
                                    fullWidth
                                    label="Email address"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <EmailOutlinedIcon
                                                className="mr-2 text-gray-400"
                                                fontSize="small"
                                            />
                                        ),
                                    }}
                                />

                                {/* Password */}

                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <LockOutlinedIcon
                                                className="mr-2 text-gray-400"
                                                fontSize="small"
                                            />
                                        ),
                                    }}
                                />

                                {/* Security Text */}

                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-50 text-green-600">
                                        ✓
                                    </span>

                                    <span>
                                        Your connection is secure.
                                    </span>
                                </div>

                                {/* Submit Button */}

                                <Button
                                    type="submit"
                                    fullWidth
                                    disabled={loading}
                                    variant="contained"
                                    className="!mt-1 !h-12 !rounded-xl !bg-red-500 !text-sm !font-semibold !normal-case !shadow-none hover:!bg-red-600 hover:!shadow-md"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <CircularProgress
                                                size={19}
                                                thickness={5}
                                                className="!text-white"
                                            />

                                            Logging in...
                                        </span>
                                    ) : (
                                        "Login"
                                    )}
                                </Button>

                                {/* Message */}

                                {message && (
                                    <div
                                        className={`rounded-xl border px-4 py-3 text-center text-sm ${
                                            message
                                                .toLowerCase()
                                                .includes("success")
                                                ? "border-green-200 bg-green-50 text-green-600"
                                                : "border-red-200 bg-red-50 text-red-600"
                                        }`}
                                    >
                                        {message}
                                    </div>
                                )}
                            </form>

                            {/* Footer */}

                            <div className="mt-8 border-t border-gray-100 pt-6 text-center">
                                <p className="text-xs text-gray-400">
                                    Secure access to your trading account.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}