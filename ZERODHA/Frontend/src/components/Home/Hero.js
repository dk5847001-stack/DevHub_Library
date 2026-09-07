export default function Hero(){
    return(
        <div>
            <section className="w-full p-16 flex items-center justify-center">
            <img
                src="/media/images/homeHero.png"
                alt="Zerodha"
                className="max-w-full h-auto"
            /><br/>
        </section>
        <section className="flex py-2 justify-center flex-col items-center">
            <h1 className="text-3xl font-semibold">Invest in everything</h1>
            <p>Online platform to invest in stocks, derivatives, mutual funds, and more</p>
            <button className="py-2 px-10 mt-2 bg-blue-600 rounded border-1 border-blue-600 text-white hover:bg-blue-700 cursor-pointer">Signup now</button>
        </section>
        </div>
    )
}