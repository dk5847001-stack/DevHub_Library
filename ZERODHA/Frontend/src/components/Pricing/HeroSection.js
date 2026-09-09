export default function HeroSection() {
    const pricingPlans = [
        {
            icon: "↗",
            title: "Equity Delivery",
            description:
                "Invest in stocks for the long term with zero commission.",
            price: "₹0",
            subtitle: "for equity investments",
            features: [
                "Zero commission on delivery trades",
                "Access to 1,000+ stocks",
                "Real-time market insights",
                "Easy portfolio tracking",
            ],
            button: "Start Investing",
            popular: false,
        },
        {
            icon: "⚡",
            title: "Intraday & F&O",
            description:
                "Trade intraday and F&O at a flat ₹20 per executed order.",
            price: "₹20",
            subtitle: "per executed order",
            features: [
                "Flat ₹20 for intraday trades",
                "Flat ₹20 for F&O trades",
                "No hidden charges",
                "Advanced charts & tools",
            ],
            button: "Start Trading",
            popular: true,
        },
        {
            icon: "♛",
            title: "Premium / Pro",
            description:
                "Get advanced tools, research and exclusive features for serious traders.",
            price: "₹0",
            subtitle: "add-on, optional",
            features: [
                "Advanced charting (Pro)",
                "Premium research & insights",
                "Enhanced trading tools",
                "Priority customer support",
            ],
            button: "Upgrade to Pro",
            popular: false,
        },
    ];

    return (
        <section className="w-full bg-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto">

                {/* ================= HEADER ================= */}
                <div className="text-center mb-12 sm:mb-16">

                    <span className="inline-flex items-center px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold tracking-[0.25em] mb-5">
                        PRICING
                    </span>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                        Simple. Transparent. Affordable.
                    </h1>

                    <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
                        Free equity investments and flat ₹20 intraday and F&O
                        trades.
                    </p>

                    {/* Small divider */}
                    <div className="flex justify-center items-center gap-3 mt-8">
                        <span className="w-16 h-[2px] bg-slate-200"></span>
                        <span className="w-16 h-[3px] bg-blue-600 rounded-full"></span>
                        <span className="w-16 h-[2px] bg-slate-200"></span>
                    </div>
                </div>

                {/* ================= PRICING CARDS ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">

                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col rounded-2xl p-7 sm:p-8 transition-all duration-300 ${
                                plan.popular
                                    ? "border-2 border-blue-500 bg-blue-50/40 shadow-xl shadow-blue-100/60 lg:-translate-y-2"
                                    : "border border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-xl"
                            }`}
                        >

                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute top-0 right-0">
                                    <div className="bg-blue-600 text-white text-xs sm:text-sm font-semibold px-5 py-2 rounded-bl-xl rounded-tr-xl">
                                        MOST POPULAR
                                    </div>
                                </div>
                            )}

                            {/* Icon */}
                            <div
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-7 ${
                                    plan.popular
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                        : "bg-blue-50 text-blue-600 border border-blue-100"
                                }`}
                            >
                                {plan.icon}
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl font-bold text-slate-900">
                                {plan.title}
                            </h2>

                            {/* Description */}
                            <p className="text-slate-500 leading-7 mt-3 min-h-[84px]">
                                {plan.description}
                            </p>

                            {/* Price */}
                            <div className="mt-6">
                                <div className="flex items-end gap-2">
                                    <span className="text-5xl font-bold text-slate-900 tracking-tight">
                                        {plan.price}
                                    </span>
                                </div>

                                <p className="text-slate-500 mt-1">
                                    {plan.subtitle}
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-slate-200 my-7"></div>

                            {/* Features */}
                            <div className="space-y-4 flex-1">
                                {plan.features.map((feature, featureIndex) => (
                                    <div
                                        key={featureIndex}
                                        className="flex items-start gap-3"
                                    >
                                        <span
                                            className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                                                plan.popular
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-blue-500 text-white"
                                            }`}
                                        >
                                            ✓
                                        </span>

                                        <span className="text-slate-600 text-sm sm:text-base">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Button */}
                            <button
                                className={`w-full mt-8 py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                                    plan.popular
                                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
                                        : "border border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white"
                                }`}
                            >
                                {plan.button}

                                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </button>
                        </div>
                    ))}
                </div>

                {/* ================= BOTTOM NOTE ================= */}
                <div className="text-center mt-10">
                    <p className="text-sm text-slate-400">
                        All charges are transparent with no hidden fees.
                    </p>
                </div>
            </div>
        </section>
    );
}