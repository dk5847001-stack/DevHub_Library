import { useEffect, useState } from "react";

const Summary = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

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

                console.log("Auth Check:", data);

                if (!isMounted) return;

                if (response.ok && data.success && data.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error(
                    "Authentication check failed:",
                    error
                );

                if (isMounted) {
                    setUser(null);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        checkAuth();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>
            {/* =========================================
                USERNAME
            ========================================= */}

            <div className="username">
                {loading
                    ? "Loading..."
                    : <p>👋Hi! <b>{user?.name},</b></p> || "Hi user!"}

                <hr className="divider" />
            </div>

            {/* =========================================
                EQUITY
            ========================================= */}

            <div className="section">
                <span>
                    <p>Equity</p>
                </span>

                <div className="data">

                    <div className="first">
                        <h3>3.74k</h3>

                        <p>
                            Margin available
                        </p>
                    </div>

                    <hr />

                    <div className="second">
                        <p>
                            Margins used{" "}
                            <span>0</span>
                        </p>

                        <p>
                            Opening balance{" "}
                            <span>3.74k</span>
                        </p>
                    </div>

                </div>

                <hr className="divider" />
            </div>

            {/* =========================================
                HOLDINGS
            ========================================= */}

            <div className="section">
                <span>
                    <p>Holdings (13)</p>
                </span>

                <div className="data">

                    <div className="first">
                        <h3 className="profit">
                            1.55k{" "}
                            <small>
                                +5.20%
                            </small>
                        </h3>

                        <p>
                            P&L
                        </p>
                    </div>

                    <hr />

                    <div className="second">
                        <p>
                            Current Value{" "}
                            <span>31.43k</span>
                        </p>

                        <p>
                            Investment{" "}
                            <span>29.88k</span>
                        </p>
                    </div>

                </div>

                <hr className="divider" />
            </div>
        </>
    );
};

export default Summary;