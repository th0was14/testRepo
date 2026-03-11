'use client';

import { useState } from 'react';
import { extractResourcesFromSwagger, generateFormConfigFromSchema, type FormSchemaConfig, type OpenAPISchema } from './swaggerToForm';

type Mode = 'import' | 'generate' | 'edit' | 'preview';

export default function GenerateJsonForm() {
    const [mode, setMode] = useState<Mode>('import');
    const [swagger, setSwagger] = useState<OpenAPISchema | null>(null);
    const [formConfig, setFormConfig] = useState<FormSchemaConfig | null>(null);
    const [selectedResource, setSelectedResource] = useState<string>('');
    const [resources, setResources] = useState<string[]>([]);
    const [jsonText, setJsonText] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleSwaggerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        setSuccess('');
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = event.target?.result as string;
                const swaggerData = JSON.parse(content) as OpenAPISchema;
                setSwagger(swaggerData);

                const foundResources = extractResourcesFromSwagger(swaggerData);
                setResources(foundResources);
                setSelectedResource(foundResources[0] || '');
                setMode('generate');
                setSuccess(`✅ Swagger imported! Found ${foundResources.length} resource(s)`);
            } catch (err) {
                setError('❌ Failed to parse swagger.json');
            }
        };
        reader.readAsText(file);
    };

    const handleFormUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        setSuccess('');
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = event.target?.result as string;
                const config = JSON.parse(content) as FormSchemaConfig;
                setFormConfig(config);
                setJsonText(JSON.stringify(config, null, 2));
                setMode('edit');
                setSuccess('✅ Form config imported!');
            } catch (err) {
                setError('❌ Failed to parse form.json');
            }
        };
        reader.readAsText(file);
    };

    const handleGenerateForm = () => {
        if (!swagger || !selectedResource) {
            setError('Please select a resource');
            return;
        }

        const inputSchemaName = selectedResource + 'Input';
        const schema = swagger.components?.schemas?.[inputSchemaName];

        if (!schema) {
            setError(`Schema ${inputSchemaName} not found`);
            return;
        }

        const config = generateFormConfigFromSchema(selectedResource, schema, `/api/${selectedResource.toLowerCase()}`);

        setFormConfig(config);
        setJsonText(JSON.stringify(config, null, 2));
        setMode('preview');
        setSuccess('✅ Form generated from swagger!');
    };

    const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setJsonText(e.target.value);
        try {
            setFormConfig(JSON.parse(e.target.value));
            setError('');
        } catch {
            setError('❌ Invalid JSON');
        }
    };

    const handleDownload = () => {
        if (!formConfig) return;

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonText));
        element.setAttribute('download', `${selectedResource || 'form'}.json`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(jsonText);
        setSuccess('📋 JSON copied to clipboard!');
        setTimeout(() => setSuccess(''), 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">FormEngine Generator</h1>
                    <p className="text-slate-400">Generate FormEngine configurations from OpenAPI Swagger specs or edit existing form.json files</p>
                </div>

                {/* Alerts */}
                {error && <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded text-red-400">{error}</div>}

                {success && <div className="mb-4 p-4 bg-green-500/10 border border-green-500 rounded text-green-400">{success}</div>}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sidebar - Controls */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6">
                            {/* Mode Selection */}
                            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                                <h2 className="text-lg font-bold text-white mb-4">Mode</h2>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => {
                                            setMode('import');
                                            setError('');
                                            setSuccess('');
                                        }}
                                        className={`w-full px-4 py-2 rounded font-medium transition ${
                                            mode === 'import' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                        }`}
                                    >
                                        📥 Import
                                    </button>
                                    {swagger && (
                                        <button
                                            onClick={() => setMode('generate')}
                                            className={`w-full px-4 py-2 rounded font-medium transition ${
                                                mode === 'generate' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                            }`}
                                        >
                                            ⚙️ Generate
                                        </button>
                                    )}
                                    {formConfig && (
                                        <button
                                            onClick={() => setMode('edit')}
                                            className={`w-full px-4 py-2 rounded font-medium transition ${
                                                mode === 'edit' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                            }`}
                                        >
                                            ✏️ Edit
                                        </button>
                                    )}
                                    {formConfig && (
                                        <button
                                            onClick={() => setMode('preview')}
                                            className={`w-full px-4 py-2 rounded font-medium transition ${
                                                mode === 'preview' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                            }`}
                                        >
                                            👁️ Preview
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Import Section */}
                            {mode === 'import' && (
                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
                                    <h3 className="text-lg font-bold text-white">Upload Files</h3>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Swagger.json</label>
                                        <input
                                            type="file"
                                            accept=".json"
                                            onChange={handleSwaggerUpload}
                                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                                        />
                                    </div>

                                    <div className="pt-4 border-t border-slate-600">
                                        <label className="block text-sm font-medium text-slate-300 mb-2">form.json (for editing)</label>
                                        <input
                                            type="file"
                                            accept=".json"
                                            onChange={handleFormUpload}
                                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Generate Section */}
                            {mode === 'generate' && swagger && (
                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
                                    <h3 className="text-lg font-bold text-white">Select Resource</h3>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Resource</label>
                                        <select
                                            value={selectedResource}
                                            onChange={(e) => setSelectedResource(e.target.value)}
                                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                        >
                                            {resources.map((resource) => (
                                                <option key={resource} value={resource}>
                                                    {resource}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        onClick={handleGenerateForm}
                                        className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded hover:shadow-lg hover:shadow-purple-500/50 transition"
                                    >
                                        🚀 Generate Form
                                    </button>
                                </div>
                            )}

                            {/* Actions */}
                            {formConfig && (
                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-3">
                                    <h3 className="text-lg font-bold text-white">Export</h3>

                                    <button
                                        onClick={handleDownload}
                                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition"
                                    >
                                        📥 Download JSON
                                    </button>

                                    <button
                                        onClick={handleCopyToClipboard}
                                        className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded transition"
                                    >
                                        📋 Copy to Clipboard
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Editor Mode */}
                        {mode === 'edit' && (
                            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                                <h2 className="text-xl font-bold text-white mb-4">Edit JSON</h2>
                                <textarea
                                    value={jsonText}
                                    onChange={handleJsonChange}
                                    className={`w-full h-96 px-4 py-3 bg-slate-900 border rounded font-mono text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                                        error ? 'border-red-500' : 'border-slate-600'
                                    }`}
                                />
                            </div>
                        )}

                        {/* Preview Mode */}
                        {mode === 'preview' && formConfig && (
                            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
                                <h2 className="text-xl font-bold text-white">Preview</h2>

                                <div className="bg-slate-900 rounded p-4 border border-slate-700">
                                    <pre className="text-slate-100 text-sm overflow-auto max-h-96">{JSON.stringify(formConfig, null, 2)}</pre>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-900 rounded p-4 border border-slate-700">
                                        <p className="text-slate-300 text-sm">
                                            <span className="font-bold text-white">Endpoint:</span> {formConfig.endpoint}
                                        </p>
                                        <p className="text-slate-300 text-sm mt-2">
                                            <span className="font-bold text-white">Method:</span> {formConfig.method}
                                        </p>
                                    </div>

                                    <div className="bg-slate-900 rounded p-4 border border-slate-700">
                                        <p className="text-slate-300 text-sm">
                                            <span className="font-bold text-white">Sections:</span> {formConfig.sections.length}
                                        </p>
                                        <p className="text-slate-300 text-sm mt-2">
                                            <span className="font-bold text-white">Fields:</span>{' '}
                                            {formConfig.sections.reduce((acc, s) => acc + s.fields.length, 0)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Info Mode */}
                        {mode === 'import' && !swagger && (
                            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                                <div className="flex flex-col items-center justify-center h-96 text-center">
                                    <div className="text-6xl mb-4">📄</div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Get Started</h3>
                                    <p className="text-slate-400 max-w-md">
                                        Upload a <code className="bg-slate-900 px-2 py-1 rounded text-pink-400">swagger.json</code> file to generate
                                        FormEngine configurations, or import an existing{' '}
                                        <code className="bg-slate-900 px-2 py-1 rounded text-pink-400">form.json</code> to edit it.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Fields Preview */}
                        {mode === 'preview' && formConfig && (
                            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mt-6">
                                <h3 className="text-lg font-bold text-white mb-4">Fields</h3>
                                <div className="space-y-3 max-h-96 overflow-auto">
                                    {formConfig.sections[0]?.fields.map((field) => (
                                        <div key={field.name} className="bg-slate-900 rounded p-3 border border-slate-700">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold text-white">{field.label}</p>
                                                    <p className="text-xs text-slate-400 mt-1">
                                                        {field.name} • {field.type}
                                                    </p>
                                                </div>
                                                {field.validation?.required && (
                                                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Required</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
