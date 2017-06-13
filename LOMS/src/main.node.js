import LOMS from './app';

if (typeof window !== "undefined" && root === window) {
    console.log('dev mode');
} else {
    const app = new LOMS;
    app.beginGame();
}
