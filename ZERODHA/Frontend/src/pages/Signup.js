import { useState, useEffect } from "react";
import {
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Signup() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState({
        name: "",
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
        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/signup`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok && data.success) {
                setFormData(data.user);
                setMessage(data.message);

                setFormData({
                    name: "",
                    email: "",
                    password: "",
                });

                setTimeout(() => {
                    window.location.replace("http://localhost:5173");
                }, 1000);
            } else {
                setMessage(data.message || "login faild!");
            }
        } catch (err) {
            console.log(err);
            setMessage(err.message || "something went wrong!");
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
                                Start your
                                <span className="block text-red-500">
                                    investing journey.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-md text-sm leading-7 text-gray-500">
                                Create your account and get access to a
                                simple, secure and powerful trading
                                experience.
                            </p>

                        </div>

                        {/* Bottom Info */}
                        <div className="mt-10">

                            <div className="flex items-center gap-3">

                                <div className="flex -space-x-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-50 bg-red-100 text-xs font-semibold text-red-500">
                                        D
                                    </div>

                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-50 bg-blue-100 text-xs font-semibold text-blue-500">
                                        A
                                    </div>

                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-50 bg-green-100 text-xs font-semibold text-green-500">
                                        R
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500">
                                    Join thousands of users
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* =========================================
                        RIGHT SIDE - SIGNUP FORM
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
                                    CREATE ACCOUNT
                                </p>

                                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
                                    Welcome aboard
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    Enter your details to create your account.
                                </p>

                            </div>

                            {/* Form */}
                            <form
                                onSubmit={handleFormSubmit}
                                className="flex flex-col gap-5"
                            >

                                {/* Name */}
                                <TextField
                                    fullWidth
                                    label="Full name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <PersonIcon 
                                                className="mr-2 text-gray-400"
                                                fontSize="small"
                                            />
                                        ),
                                    }}
                                />

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
                                    InputProps={{
                                        startAdornment: (
                                            <LockOutlinedIcon
                                                className="mr-2 text-gray-400"
                                                fontSize="small"
                                            />
                                        ),
                                    }}
                                />

                                {/* Terms */}
                                <p className="text-xs leading-5 text-gray-500">
                                    By creating an account, you agree to our{" "}
                                    <span className="font-medium text-gray-700">
                                        terms
                                    </span>{" "}
                                    and{" "}
                                    <span className="font-medium text-gray-700">
                                        privacy policy
                                    </span>
                                    .
                                </p>

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
                                            Creating account...
                                        </span>
                                    ) : (
                                        "Create account"
                                    )}
                                </Button>

                                {/* Message */}
                                {message && (
                                    <div
                                        className={`rounded-xl border px-4 py-3 text-center text-sm ${
                                            message.includes("success")
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
                                    Your information is securely protected.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}