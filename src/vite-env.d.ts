/// <reference types="vite/client" />

type IKey = 'date' | 'ptw' | 'watching' | 'done' | 'onhold' | 'drop' | 'total';

type IData = Record<IKey, string>;
