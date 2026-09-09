import HeroSection from "../components/Products/HeroSection";
import LeftSection from "../components/Products/LeftSection";
import RightSection from "../components/Products/RightSection";
import Universe from "../components/Products/Universe";

export default function Product() {
    return (
        <div>
            <HeroSection />
            <hr className="w-260 text-gray-300 shadow-xl mt-16 m-auto" />
            <LeftSection
                imageURL="/media/images/kite.png"
                productName="Kite"
                productDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
                tryDemo=""
                learnMore=""
                googlePlay=""
                appStore=""
            />

            <RightSection
                imageURL="/media/images/console.png"
                productName="Console"
                productDescription="Monitor and manage your trading activities with Console, a powerful analytics platform that provides detailed insights into your investments, trades, portfolio performance, and financial progress."
                tryDemo=""
                learnMore=""
                googlePlay=""
                appStore=""
            />

            <LeftSection
                imageURL="/media/images/coin.png"
                productName="Coin"
                productDescription="Invest in mutual funds effortlessly with Coin, a simple and powerful investment platform. Discover, invest, and manage your mutual fund portfolio with a seamless experience, transparent insights, and easy-to-use tools—all in one place."
                tryDemo=""
                learnMore=""
                googlePlay=""
                appStore=""
            />

            <RightSection
                imageURL="/media/images/kiteconnect.png"
                productName="Kite connec api"
                productDescription="Build powerful trading applications with Kite Connect API, offering reliable access to market data, order execution, portfolios, and trading tools through simple and developer-friendly APIs."
                tryDemo=""
                learnMore=""
                googlePlay=""
                appStore=""
            />

            <LeftSection
                imageURL="/media/images/varsity.png"
                productName="Varsity mobile"
                productDescription="Learn finance and investing the smart way with Varsity, a comprehensive learning platform covering stock markets, trading, investing, and personal finance through simple, easy-to-understand lessons."
                tryDemo=""
                learnMore=""
                googlePlay=""
                appStore=""
            />
            <Universe />
        </div>
    )
}