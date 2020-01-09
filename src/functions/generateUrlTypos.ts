export function generateUrlTypos(url: string) {
    const urlData = new URL(url);

    const host = urlData.host;

    const hostVariations = new Set([
        ...missEachCharacter(host),
        ...duplicateEachCharacter(host),
        ...swapEachCharacterPair(host),
    ]);

    return Array.from(hostVariations)
        .filter(hostname => hostname !== host)
        .map(hostname => `${urlData.protocol}//${hostname}${urlData.pathname}${urlData.search}`);
}

function missEachCharacter(text: string) {
    const results: string[] = [];

    for (let i=0; i<text.length; i++) {
        results.push(`${text.substr(0, i)}${text.substr(i + 1)}`);
    }

    return results;
}

function swapEachCharacterPair(text: string) {
    const results: string[] = [];

    for (let i=1; i<text.length; i++) {
        results.push(`${text.substr(0, i - 1)}${text[i]}${text[i-1]}${text.substr(i + 1)}`);
    }

    return results;
}

function duplicateEachCharacter(text: string) {
    const results: string[] = [];

    for (let i=0; i<text.length; i++) {
        results.push(`${text.substr(0, i)}${text[i]}${text.substr(i)}`);
    }

    return results;
}