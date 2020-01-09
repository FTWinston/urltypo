export function fixupUrl(url: string) {
    return url.startsWith('http')
        ? url
        : 'http://' + url;
}