import { urlExists } from './urlExists';

test('google.com exists', async () => {
    const result = await urlExists('http://google.com');
    expect(result).toBe(true);
});

test('ioadwloawdmgad.com doesn\'t exists', async () => {
    const result = await urlExists('http://ioadwloawdmgad.com');
    expect(result).toBe(false);
});
