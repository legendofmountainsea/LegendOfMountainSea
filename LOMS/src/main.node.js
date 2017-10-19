import LOMS from './app';

if (typeof window !== 'undefined' && root === window) {
    //dev mode
} else {
    const app = new LOMS;
    app.beginGame();
}
