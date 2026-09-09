export default function Brojkerage() {
    return (
        <div>
            <div className="flex mt-16 mb-16 justify-around">
                <div className="flex w-1/3 flex-col">
                    <h1 className="text-blue-600 text-2xl">Brokerage calculator</h1>
                    <ul>
                        <li className="list-disc pl-6 space-y-3 text-gray-500 mb-3 mt-4">Call & Trade and RMS auto-squareoff: Additional charges of ₹50 + GST per order.</li>
                        <li className="list-disc pl-6 space-y-3 text-gray-500 mb-3">Digital contract notes will be sent via e-mail.</li>
                        <li className="list-disc pl-6 space-y-3 text-gray-500 mb-3">Physical copies of contract notes, if required, shall be charged ₹20 per contract note. Courier charges apply.</li>
                        <li className="list-disc pl-6 space-y-3 text-gray-500 mb-3">For NRI account (non-PIS), 0.5% or ₹100 per executed order for equity (whichever is lower).</li>
                        <li className="list-disc pl-6 space-y-3 text-gray-500 mb-3">For NRI account (PIS), 0.5% or ₹200 per executed order for equity (whichever is lower).</li>
                        <li className="list-disc pl-6 space-y-3 text-gray-500 mb-3">If the account is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20 per executed order.</li>
                    </ul>
                </div>
                <div>
                    <h1 className="text-blue-600 text-2xl">List of Charges</h1>
                </div>
            </div>
            </div>
    )
}