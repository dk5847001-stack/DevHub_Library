export default function Pricing() {
    return (
        <div>
            <div className="flex p-16 mt-16 justify-between">

                <div className="w-120">
                    <h2 className="text-2xl font-semibold">
                        Unbeatable pricing
                    </h2>

                    <br />

                    <p>
                        We pioneered the concept of discount broking and price
                        transparency in India. Flat fees and no hidden charges.
                    </p>

                    <a
                        className="text-blue-800 hover:text-blue-700"
                        href="/google.com"
                    >
                        See pricing →
                    </a>
                </div>

                <div>
                    <table>
                        <tbody>
                            <tr>

                                <td className="border border-gray-300 p-2 w-75 h-40 text-center">
                                    <div className="flex justify-center items-center flex-col">
                                        <p className="text-2xl font-bold text-gray-700">
                                            ₹0
                                        </p>

                                        <p className="text-gray-600">
                                            Free equity delivery and direct mutual funds
                                        </p>
                                    </div>
                                </td>

                                <td className="border border-gray-300 p-2 w-75 h-40 text-center">
                                    <div className="flex justify-center items-center flex-col">
                                        <p className="text-2xl font-bold text-gray-700">
                                            ₹20
                                        </p>

                                        <p className="text-gray-600">
                                            Intraday and F&O
                                        </p>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}