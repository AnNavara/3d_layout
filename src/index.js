import './styles/style.css';
import { throttle } from './scripts/utils';
import { updateElementsPosition } from './scripts/layoutHandler';
import handleDecks from './scripts/deckHoverHandler';

const decks = document.querySelectorAll('.deck');

// Build layout
updateElementsPosition(decks);

document.addEventListener('scroll', () => {
    // TODO: FIX THROTTLING
    throttle(updateElementsPosition(decks), 16);
});

// Add Hover Handler
handleDecks(decks);
