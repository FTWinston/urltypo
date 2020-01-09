import React, { useState, useMemo } from 'react';
import './App.css';
import { UrlForm } from './UrlForm';
import { urlExists } from '../functions/urlExists';
import { ResultList } from './ResultList';
import { generateUrlTypos } from '../functions/generateUrlTypos';
import { filterExistingUrls } from '../functions/filterExistingUrls';
import { fixupUrl } from '../functions/fixupUrl';

export const App: React.FC = () => {
    const [status, setStatus] = useState<string>();
    const [results, setResults] = useState<string[]>();

    const submitted = useMemo(
        () => async (url: string) => {
            url = fixupUrl(url);
            const urlValid = await urlExists(url);

            if (!urlValid) {
                setStatus('Error: URL not found');
                return;
            }

            const allTypoUrls = generateUrlTypos(url);

            setStatus(`Checking ${allTypoUrls.length} possible typos...`);

            const typoUrls = await filterExistingUrls(allTypoUrls);
            
            setResults(typoUrls);

            setStatus(`Checked ${allTypoUrls.length} possible typos, ${typoUrls.length} exist(s)`);
        },
        []
    );

    const cleared = useMemo(
        () => () => {
            setResults(undefined);
            setStatus(undefined);
        },
        []
    );

    const statusDisplay = status === undefined
        ? undefined
        : <div className="app__status">{status}</div>

    const resultDisplay = results === undefined || results.length === 0
        ? undefined
        : <ResultList urls={results} />

    return (
        <div className="app">
            <header className="app__header">
                <p>Quickly check what typos of a URL exist.</p>
                <UrlForm
                    onSubmit={submitted}
                    onClear={cleared}
                    disabled={status !== undefined}
                />
            </header>

            {statusDisplay}
            {resultDisplay}
        </div>
    );
}