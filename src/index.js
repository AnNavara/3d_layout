import './styles/style.css';
import { throttle } from './scripts/utils';
import { updateElementsPosition } from './scripts/layoutHandler';
import handleDecks from './scripts/deckHoverHandler';

const decks = document.querySelectorAll('.deck');

// Build layout
updateElementsPosition(decks);
const throttled = throttle(updateElementsPosition, 15);
document.addEventListener('scroll', throttled.bind(this, decks));

// Add Hover Handler
handleDecks(decks);
