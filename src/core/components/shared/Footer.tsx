
export const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-white shrink-0">
            <div className="w-full max-w-7xl mx-auto p-4">
                <hr className="my-4 border-gray-200 sm:mx-auto" />
                <span className="block text-xs md:text-sm text-gray-500 text-center">© {year} Cirkula -  Todos los derechos reservados</span>
            </div>
        </footer>
    )
}