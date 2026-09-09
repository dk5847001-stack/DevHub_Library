export default function HeroSection() {
    return (
        <div>
            <div className="flex justify-center items-center py-16 flex-col">
                <h1 className="text-3xl text-gray-800 font-semibold">
                    We pioneered the discount broking model in India.
                </h1>

                <h1 className="text-3xl text-gray-800 font-semibold">
                    Now, we are breaking ground with our technology.
                </h1>
            </div>

            <hr className="w-330 text-gray-300 mt-8 m-auto" />

            <br />

            <div className="flex justify-around">
                <div className="w-1/4">
                    <p className="text-sm text-gray-500 mb-4">
                        We kick-started operations on the 15th of August, 2010
                        with the goal of breaking all barriers that traders and
                        investors face in India in terms of cost, support, and
                        technology. We named the company Zerodha, a combination
                        of Zero and "Rodha", the Sanskrit word for barrier.
                    </p>

                    <p className="text-sm text-gray-500 mb-4">
                        Today, our disruptive pricing models and in-house technology have made us the biggest stock broker in India.
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                        Over 1+ Crore clients place millions of orders every day
                        through our powerful ecosystem of investment platforms,
                        contributing over 15% of all Indian retail trading
                        volumes.
                    </p>
                </div>
                {/* ------------------------------ */}
                <div className="w-1/4">
                    <p className="text-md text-gray-500 mb-4">
                        In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.
                    </p>

                    <p className="text-md text-gray-500 mb-4">
                        <span className="text-blue-500">Rainmatter</span>, our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.                    </p>
                    <p className="text-md text-gray-500 mb-4">
                        And yet, we are always up to something new every day. Catch up on the latest updates on our blog or see what the media is saying about us.
                    </p>
                </div>

            </div>
            <hr className="w-330 text-gray-200 mt-8 shadow-lg m-auto" /><br />
        </div>
    );
}