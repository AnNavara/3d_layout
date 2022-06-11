import { translateSelector } from './layoutHandler';
import { setStyles } from './utils';

const setCardsInactive = (cards) => {
    cards.forEach((card) => {
        setStyles(card, {
            styles: {
                position: '',
                top: '',
                left: '',
                width: '',
                height: '',
                maxHeight: '',
            },
        });
        translateSelector(card);
    });
};

const setCardActive = (card, boundingBox) => {
    const widthPx = (document.documentElement.clientWidth / 100) * 35;
    const top = document.documentElement.clientHeight / 2 > boundingBox.top ? '2' : '-2';

    setStyles(card, {
        styles: {
            position: 'absolute',
            maxWidth: `${widthPx}px`,
            width: `${widthPx}px`,
            height: `${boundingBox.height + 100}px`,
            maxHeight: `${boundingBox.height + 100}px`,
        },
    });

    if (card.classList.contains('card--1')) {
        setStyles(card, {
            styles: {
                left: `${-boundingBox.x + 40}px`,
            },
        });
    }
    if (card.classList.contains('card--2')) {
        setStyles(card, {
            styles: {
                top: `${top}rem`,
                left: `${-boundingBox.x - 20 + widthPx}px`,
                transform: 'scale(1)',
            },
        });
    }
    if (card.classList.contains('card--3')) {
        setStyles(card, {
            styles: {
                top: `${top * 2}rem`,
                left: `${-boundingBox.x - 100 + widthPx * 2}px`,
                transform: 'scale(1)',
            },
        });
    }
};

const handleDeck = (event) => {
    if (!event.currentTarget.classList.contains('deck')) return;

    const container = event.currentTarget.querySelector('.deck__container');
    const cards = event.currentTarget.querySelectorAll('.card');
    const boundingBox = event.currentTarget.getBoundingClientRect();

    if (container.parentNode.classList.contains('deck--active')) {
        container.parentNode.classList.remove('deck--active');
        container.classList.remove('deck__container--active');
        setCardsInactive(cards);
    } else {
        container.parentNode.classList.add('deck--active');
        container.classList.add('deck__container--active');

        cards.forEach((card) => {
            setCardActive(card, boundingBox);
        });
    }
};

const handleDecks = (decks) => {
    decks.forEach((deck) => {
        deck.addEventListener('click', handleDeck);
    });
};

export default handleDecks;
