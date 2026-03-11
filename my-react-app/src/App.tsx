import { Link, Outlet } from 'react-router-dom';

const App = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Navigation */}
        <nav className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-purple-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">R</span>
                        </div>
                        <span className="text-white text-xl font-bold">React App</span>
                    </Link>
                    <div className="hidden md:flex gap-8">
                        <Link to="/" className="text-slate-300 hover:text-white transition">
                            Home
                        </Link>
                        <Link to="/page" className="text-slate-300 hover:text-white transition">
                            Page
                        </Link>
                        <Link to="/generate-json-form" className="text-slate-300 hover:text-white transition">
                            Generate JSON Form
                        </Link>
                        <Link to="/test-form" className="text-slate-300 hover:text-white transition">
                            Test Form
                        </Link>
                        <a href="#contact" className="text-slate-300 hover:text-white transition">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </nav>

        {/* Page Content */}
        <Outlet />
    </div>
);

export default App;
