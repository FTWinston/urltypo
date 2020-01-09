import React, { FunctionComponent } from 'react';
import './ResultList.css';

interface Props {
    urls: string[];
}

export const ResultList: FunctionComponent<Props> = props => {
    return (
        <ol className="resultList">
            {props.urls.map(r => (
                <li key={r} className="resultList__item">
                    <a href={r} target="_blank" rel="noopener noreferrer">{stripScheme(r)}</a>
                </li>
            ))}
        </ol>
    );
}

function stripScheme(url: string) {
    const pos = url.indexOf('//');

    return pos === -1
        ? url
        : url.substr(pos + 2);
}