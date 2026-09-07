export default function Awards(){
    return(
        <div className="py-20">
            <section className="w-full flex justify-around">
            <div>
                <img src="/media/images/largestBroker.svg" />
            </div>

            <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold">Largest stock broker in India</h1>
            <p>2+ million Zerodha clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:</p>
            <div className="flex juscify-between gap-50 py-10">
            <div className="left">
            <ul>
                <li className="list-disc mb-3"><p>Futures and Options</p></li>
                <li className="list-disc mb-3"><p>Commodity derivatives</p></li>
                <li className="list-disc mb-3"><p>Currency derivatives</p></li>
            </ul>
            </div>
            <div className="right">
             <ul>
                <li className="list-disc mb-3"><p>Stocks & IPOs</p></li>
                <li className="list-disc mb-3"><p>Direct mutual funds</p></li>
                <li className="list-disc mb-3"><p>Bonds and Grow</p></li>
            </ul>
            </div>
            </div>
            <img src="/media/images/pressLogos.png" alt="pressLogos"/>
            </div>
            </section>
        </div>
    )
}