import LOMS from './app';

if (typeof window !== 'undefined') {
    //dev mode
} else {
    const app = new LOMS;
    app.beginGame();
}
