import { urlExists } from './urlExists';

export async function filterExistingUrls(urls: string[]) {
    const checkingAll = urls.map(url => urlExists(url));

    const checkResults = await Promise.all(checkingAll);

    return urls.filter((_url, index) => checkResults[index]);
}