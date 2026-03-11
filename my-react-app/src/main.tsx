import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './index.css';
import App from './App.tsx';
import Home from '@pages/Home/Home.tsx';
import Page from '@pages/Page/Page.tsx';
import GenerateJsonFormPage from '@pages/GenerateJsonForm/page.tsx';
import PageTestForm from '@pages/PageFormTest/Page.tsx';
import { queryClient } from '@/lib/queryClient';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<App />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/page" element={<Page />} />
                        <Route path="/generate-json-form" element={<GenerateJsonFormPage />} />
                        <Route path="/test-form" element={<PageTestForm />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </StrictMode>,
);
