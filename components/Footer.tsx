const Footer = () => {
    return (
        <footer className="w-full bg-slate-50 border-t border-gray-200 px-4 py-10 text-sm text-gray-800/70">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                <div className="flex items-center gap-2 flex-1 justify-center md:justify-start">
                    <img
                        className="w-6 h-6 rounded-lg object-cover"
                        src="/logo.jpg"
                        alt="Meta Arch"
                    />
                    <span className="text-md font-serif font-bold text-black tracking-tight">
                        Meta Arch
                    </span>
                </div>

                <div className="flex flex-wrap justify-center gap-4 md:gap-6 flex-1 text-gray-500">
                    <a
                        href="#"
                        className="text-xs font-medium hover:text-black transition-colors"
                    >
                        Product
                    </a>
                    <a
                        href="#"
                        className="text-xs font-medium hover:text-black transition-colors"
                    >
                        Pricing
                    </a>
                    <a
                        href="#"
                        className="text-xs font-medium hover:text-black transition-colors"
                    >
                        Community
                    </a>
                    <a
                        href="#"
                        className="text-xs font-medium hover:text-black transition-colors"
                    >
                        Enterprise
                    </a>
                </div>

                <div className="flex-1 flex justify-center md:justify-end">
                    <p className="text-xs">© 2026 DDK</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
