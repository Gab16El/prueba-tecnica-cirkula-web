export const Navbar = () => {

    return (
        <nav className="bg-white text-gray-800 border-gray-500 px-1.5 md:px-16">
            <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center justify-around">
                    <img
                        src="/assets/logos/cirkula.png"
                        className=" h-6 w-6 sm:h-9 sm:w-9"
                        alt="Logo"
                    />
                    <div className="block ml-4 border-l-gray-500">
                        <h1 className="self-center text-2xl font-bold whitespace-nowrap text-primary">
                            Cirkula
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

            </div>
        </nav>
    )
}