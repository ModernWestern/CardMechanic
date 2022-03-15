import { createContext } from 'react';

export default function Context() {}

const CharacterContext = createContext(null);
const DeckContext = createContext(null);

export { CharacterContext, DeckContext };
