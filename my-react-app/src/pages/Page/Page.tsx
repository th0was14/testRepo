import { Link } from "react-router-dom";
import FormEngine from "../../form-engine/FormEngine";
import formConfig from "./form.json";

const Page = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    {/* Hero Section */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <div className="text-center mb-12">
        <Link
          to="/"
          className="inline-block mb-8 px-6 py-2 rounded-lg border border-purple-500 text-purple-300 font-semibold hover:bg-purple-500/10 transition"
        >
          ← Retour à l&apos;accueil
        </Link>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Page
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Détaille
          </span>
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Découvrez les détails importants sur notre application et son
          fonctionnement.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-800/80 backdrop-blur border border-purple-500/20 rounded-2xl p-8 shadow-xl">
          <FormEngine config={formConfig} />
        </div>
      </div>

      {/* Content Section 1 */}
      <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl p-8 mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Comment ça fonctionne ?
        </h2>
        <p className="text-slate-300 mb-4 leading-relaxed">
          Notre application utilise les dernières technologies web pour vous
          offrir une expérience optimale. Nous avons intégré un système de
          routage avec React Router pour une navigation fluide entre les pages.
        </p>
        <p className="text-slate-300 leading-relaxed">
          Chaque page est conçue pour offrir une interface claire et intuitive,
          avec un design moderne et responsive qui s&apos;adapte à tous les
          appareils.
        </p>
      </div>

      {/* Content Section 2 */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">✨ Design</h3>
          <p className="text-slate-300">
            Interface moderne utilisant Tailwind CSS pour un design cohérent et
            professionnel sur toutes les pages.
          </p>
        </div>
        <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">🚀 Performance</h3>
          <p className="text-slate-300">
            Optimisé pour les performances avec chargement rapide et gestion
            efficace du routage.
          </p>
        </div>
      </div>

      {/* Content Section 3 */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 rounded-2xl p-8 text-center">
          <span className="text-4xl block mb-4">🎨</span>
          <h4 className="text-xl font-bold text-white mb-3">Responsive</h4>
          <p className="text-slate-300 text-sm">
            S&apos;adapte parfaitement à tous les écrans et appareils.
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 rounded-2xl p-8 text-center">
          <span className="text-4xl block mb-4">⚡</span>
          <h4 className="text-xl font-bold text-white mb-3">Rapide</h4>
          <p className="text-slate-300 text-sm">
            Performance optimisée pour une navigation fluide.
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 rounded-2xl p-8 text-center">
          <span className="text-4xl block mb-4">🔒</span>
          <h4 className="text-xl font-bold text-white mb-3">Sécurisé</h4>
          <p className="text-slate-300 text-sm">
            Votre sécurité et vos données sont notre priorité.
          </p>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-12 text-center">
        <h3 className="text-3xl font-bold text-white mb-6">
          Prêt à commencer ?
        </h3>
        <Link
          to="/"
          className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
        >
          Retourner à l&apos;accueil
        </Link>
      </div>
    </section>

    {/* Footer */}
    <footer className="border-t border-purple-500/20 bg-slate-900/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-slate-400">
          <p>&copy; 2026 React App. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
);

export default Page;
