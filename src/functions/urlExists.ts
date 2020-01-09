export async function urlExists(url: string) {
    try
    {
        await fetch(url, { mode: 'no-cors' });
        return true;
    }
    catch
    {
        return false;
    }
}