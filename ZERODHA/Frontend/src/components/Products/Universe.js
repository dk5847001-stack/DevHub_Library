export default function Universe() {
    return (
        <div className="flex mt-32 flex-col justify-center items-center">
            <p className="text-gray-600 text-sm mb-8">Want to know more about our technology stack? Check out the Zerodha.tech blog.</p>
            <h1 className="text-3xl font-semibold mb-8">The Zerodha Universe</h1>
            <p className="text-gray-600 text-sm mb-8">Extend yuo trading and investment expreience even further with our partner platforms</p>
            <div className="flex gap-32">
                <div className="flex flex-col">
                    <img src="/media/images/smallcaseLogo.png" />
                    <p className="text-xs text-gray-500">Thematic investment platform</p>
                </div>
                <div className="flex flex-col">
                    <img className="w-35" src="/media/images/streakLogo.png" />
                    <p className="text-xs text-gray-500">Algo & strategy platform</p>
                </div>
                <div className="flex flex-col">
                    <img src="/media/images/sensibullLogo.svg" />
                    <p className="text-xs pt-4 text-gray-500">Options trading platform</p>
                </div>

            </div>
            {/* ----------------------- */}
            <div className="flex mt-16 gap-32">
                <div className="flex flex-col">
                    <img className="w-35" src="/media/images/zerodhaFundhouse.png" />
                    <p className="text-xs text-gray-500">Asset management</p>
                </div>
                <div className="flex flex-col">
                    <img src="/media/images/goldenpiLogo.png" />
                    <p className="text-xs text-gray-500">Bonds trading platform</p>
                </div>
                <div className="flex flex-col">
                    <img className="w-35" src="/media/images/dittoLogo.png" />
                    <p className="text-xs text-gray-500">Options trading platform</p>
                </div>

            </div>
            <button className="w-45 mt-8 mb-16 hover:bg-blue-600 cursor-pointer bg-blue-500 text-yellow-200 rounded py-1 px-6">Sing up now</button>
        </div>
    )
}