// Aggiungi una dichiarazione per 'startColorChange' su 'window'
declare global {
  interface Window {
    startColorChange: () => void;
  }
}
// src/google-signin.d.ts
declare global {
  interface Window {
    google: any;
  }
}

export {}; // Questo è necessario per fare in modo che il file venga trattato come un modulo
