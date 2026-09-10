export default function HeroSection(){
    return(
        <div className="w-full min-h-80 bg-blue-400 py-8 text-white">
            <div className="flex justify-around">
            <p className="font-semibold">Support Portal</p>
            <p className="underline">Track Tickets</p>
            </div>
            {/* ----------------------- */}
            <div className="flex justify-around">
                <div className="flex w-1/4 mt-8 flex-col">
                <p className="text-lg font-semibold">Search for an answer or browse help topics to create a ticket</p>
                <input 
                type="text" 
                placeholder="Eg: how do i activate F&Q, why is my order getting rejected.." 
                className="bg-white border-1 border-gray-200 text-gray-500 text-xs p-4 mb-3 mt-2 font-semibold rounded shadow-xl"
                />
                <div>
                <span className="underline hover:text-white cursor-pointer mr-3 text-gray-100 text-sm">Track account opening</span>
                <span className="underline hover:text-white cursor-pointer mr-3 text-gray-100 text-sm">Track segment activation</span>
                <span className="underline hover:text-white cursor-pointer mr-3 text-gray-100 text-sm">Intraday</span>
                <span className="underline hover:text-white cursor-pointer mr-3 text-gray-100 text-sm">margins</span>
                <span className="underline hover:text-white cursor-pointer mr-3 text-gray-100 text-sm">Kite user manual</span>
                </div>
                </div>
                <div className="mt-8">
                    <p className="text-lg font-semibold">Featured</p>
                    <p className="text-sm mt-2 pl-3">1. <span className="underline">Current Takeouvers and Delisting - January 2024</span></p>
                    <p className="text-sm mt-3 pl-3">2. <span className="underline">Latest Intraday loverages - MIS & CO</span></p>
                </div>
            </div>
        </div>
    )
}