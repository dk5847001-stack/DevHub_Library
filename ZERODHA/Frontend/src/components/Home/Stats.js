export default function Stats(){
    return(
        <div className="w-full p-4">
            <div className="w-full flex p-4 justify-around">
            <div className="w-1/3">
                <h1 className="text-5xl font-semibold mb-6">Trust with confidence</h1>
                <h2 className="text-2xl font-semibold">Customer-first always</h2>
                <p className="text-sm text-gray-600">That's why 1.3 crore customers trust Zerodha with ₹3.5+ lakh crores worth of equity investments.</p><br/>
                
                <h2 className="text-2xl font-semibold">No spam or gimmicks</h2>
                <p className="text-sm text-gray-600">No gimmicks, spam, "gamification", or annoying push notifications. High quility apps that you use at your pace, the way you liki.</p><br/>
                
                <h2 className="text-2xl font-semibold">The Zerodha universe</h2>
                <p className="text-sm text-gray-600">Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored serveces specific to your needs.</p><br/>
                
                <h2 className="text-2xl font-semibold">Do better with money</h2>
                <p className="text-sm text-gray-600">With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.</p><br/>
                
            </div>

            <div className="w-1/3">
                <img className="w-160" src="/media/images/ecosystem.png" />
                <a className="text-blue-800 mr-16 hover:text-blue-700" href="/google.com">Explore our products→</a>
                <a className="text-blue-800 hover:text-blue-700" href="/google.com">Try kite demo→</a>
            </div>
            </div>
        </div>
    )
}