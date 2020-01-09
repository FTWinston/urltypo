import React, { FunctionComponent, useState, useMemo } from 'react';
import './UrlForm.css';

interface Props {
    onSubmit: (url: string) => void;
    onClear?: () => void;
    disabled?: boolean;
}

export const UrlForm: FunctionComponent<Props> = props => {
    const [url, setUrl] = useState('');

    const valueChanged = useMemo(
        () => (e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)
        , []
    );

    const { onSubmit, onClear } = props;
    const submitted = useMemo(
        () => (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onSubmit(url);
        },
        [onSubmit, url]
    );

    const clear = useMemo(
        () => () => {
            setUrl('');
            if (onClear) { onClear(); }
        },
        [onClear]
    );

    return (
        <form className="urlForm" onSubmit={submitted}>
            <input
                type="text"
                className="urlForm__input"
                placeholder="Enter URL to check"
                value={url}
                onChange={valueChanged}
                disabled={props.disabled}
            />

            <div className="urlForm__buttons">
                <input
                    type="submit"
                    className="urlForm__button urlForm__button--submit"
                    value="Check"
                    disabled={props.disabled}
                />
                <input
                    type="button"
                    className="urlForm__button"
                    onClick={clear}
                    value="Clear"
                />
            </div>
        </form>
    );
}