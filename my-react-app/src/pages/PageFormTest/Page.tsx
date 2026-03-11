import FormEngine from '../../form-engine/FormEngine';
import formConfig from './testForm.json';

const Page = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-3xl mx-auto">
            <div className="bg-slate-800/80 backdrop-blur border border-purple-500/20 rounded-2xl p-8 shadow-xl">
                <FormEngine config={formConfig} />
            </div>
        </div>

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
