import { Link } from "react-router-dom";

export default function NoteFound() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-white px-6">
            <div className="text-center max-w-lg">

                {/* 404 */}
                <div className="mb-6">
                    <h1 className="text-8xl md:text-9xl font-bold tracking-tight text-gray-900">
                        404
                    </h1>

                    <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-blue-600"></div>
                </div>

                {/* Content */}
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                    Page not found
                </h2>

                <p className="mt-4 text-gray-500 leading-7">
                    Looks like this page has moved, disappeared, or never existed.
                    Don't worry, your journey can continue from here.
                </p>

                {/* Button */}
                <div className="mt-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:-translate-y-0.5"
                    >
                        <span>←</span>
                        Back to Dashboard
                    </Link>
                </div>

            </div>
        </div>
    );
}