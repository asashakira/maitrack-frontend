export const Footer = () => {
    return (
        <footer className="bg-slate-800 text-white py-4">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex space-x-6 text-xs">
                        <a
                            href="https://github.com/asashakira/maitrack-frontend"
                            className="hover:text-lime-400"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Source Code
                        </a>
                    </div>
                    <div className="text-xs text-zinc-400">
                        MyTrack &copy; {new Date().getFullYear()}
                    </div>
                </div>
            </div>
        </footer>
    )
}
