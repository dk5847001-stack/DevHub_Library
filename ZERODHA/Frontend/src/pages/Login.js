import { useState, useEffect } from "react"

export default function Login() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const handleInputChange = (event) => {
        setFormData((previousData) => ({
            ...previousData,
            [event.target.name]: event.target.value
        }))
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/login",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );
            const data = await response.json();
            console.log(data);
            if (response.ok && data.success) {
                setFormData(data.user);
                setMessage(data.message);
                setFormData({
                    email: "",
                    password: ""
                })
                setTimeout(() => {
                    window.location.replace("http://localhost:5173");
                }, 1000);
            } else {
                setMessage(data.message || "login faild!");
            }
        } catch (err) {
            console.log(err);
            setMessage(err.message || "something went wrong!")
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <h2 className="text-center py-4">Signup page</h2><br />
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-col justify-center items-center gap-4 p-8 bg-gray-100"
            >

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-2 outline-2 outline-gray-400 w-75"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="p-2 outline-2 outline-gray-400 w-75"
                />
                <button className="w-75 p-2 outline-2 outline-blue-600 bg-blue-500 text-white">
                    {loading ? "logged in..." : "login"}
                </button>
                {
                    message &&
                    <p className={`${message.includes("success") ? "text-green-500" : "text-red-500"}`}>{message}</p>
                }
            </form>
        </div>
    )
}