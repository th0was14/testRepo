import { Link } from "react-router-dom";

const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    {/* Hero Section */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Bienvenue sur votre{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Application
          </span>
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Une application modern et rapide construite avec React et Tailwind
          CSS. Profitez d&apos;une experience utilisateur optimale.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
            Commencer
          </button>
          <Link
            to="/page"
            className="px-8 py-3 rounded-lg border border-purple-500 text-purple-300 font-semibold hover:bg-purple-500/10 transition inline-block text-center"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section
      id="features"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <h2 className="text-4xl font-bold text-white mb-12 text-center">
        Nos Fonctionnalités
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: "⚡",
            title: "Performant",
            desc: "Vitesse et optimisation au cœur du design",
          },
          {
            icon: "🎨",
            title: "Moderne",
            desc: "Interface élégante et responsive",
          },
          {
            icon: "🔒",
            title: "Sécurisé",
            desc: "Vos données sont protégées",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="p-8 rounded-xl bg-slate-800/50 border border-purple-500/20 hover:border-purple-500/50 hover:bg-slate-800/80 transition group cursor-pointer"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-slate-300">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* About Section */}
    <section
      id="about"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 h-80 rounded-2xl border border-purple-500/20 flex items-center justify-center">
          <span className="text-6xl">🚀</span>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-white mb-6">À Propos</h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Notre application est développée avec les dernières technologies
            web. Nous mettons l&apos;accent sur la performance,
            l&apos;accessibilité et l&apos;expérience utilisateur.
          </p>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Avec React et Tailwind CSS, nous créons des interfaces modernes et
            responsives qui fonctionnent parfaitement sur tous les appareils.
          </p>
          <div className="flex gap-4">
            <div>
              <div className="text-3xl font-bold text-purple-400">100%</div>
              <p className="text-slate-300">Responsive</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">∞</div>
              <p className="text-slate-300">Scalable</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer
      id="contact"
      className="border-t border-purple-500/20 bg-slate-900/50 mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Produit</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a
                  href="mailto:hello@example.com"
                  className="hover:text-white transition"
                >
                  Email
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-purple-500/20 text-center text-slate-400">
          <p>&copy; 2026 React App. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
);

export default Home;
