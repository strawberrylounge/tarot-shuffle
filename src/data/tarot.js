const MAJOR_ARCANA = [
  { id: 0,  name: 'The Fool',         suit: 'major', number: 0  },
  { id: 1,  name: 'The Magician',     suit: 'major', number: 1  },
  { id: 2,  name: 'The High Priestess', suit: 'major', number: 2 },
  { id: 3,  name: 'The Empress',      suit: 'major', number: 3  },
  { id: 4,  name: 'The Emperor',      suit: 'major', number: 4  },
  { id: 5,  name: 'The Hierophant',   suit: 'major', number: 5  },
  { id: 6,  name: 'The Lovers',       suit: 'major', number: 6  },
  { id: 7,  name: 'The Chariot',      suit: 'major', number: 7  },
  { id: 8,  name: 'Strength',         suit: 'major', number: 8  },
  { id: 9,  name: 'The Hermit',       suit: 'major', number: 9  },
  { id: 10, name: 'Wheel of Fortune', suit: 'major', number: 10 },
  { id: 11, name: 'Justice',          suit: 'major', number: 11 },
  { id: 12, name: 'The Hanged Man',   suit: 'major', number: 12 },
  { id: 13, name: 'Death',            suit: 'major', number: 13 },
  { id: 14, name: 'Temperance',       suit: 'major', number: 14 },
  { id: 15, name: 'The Devil',        suit: 'major', number: 15 },
  { id: 16, name: 'The Tower',        suit: 'major', number: 16 },
  { id: 17, name: 'The Star',         suit: 'major', number: 17 },
  { id: 18, name: 'The Moon',         suit: 'major', number: 18 },
  { id: 19, name: 'The Sun',          suit: 'major', number: 19 },
  { id: 20, name: 'Judgement',        suit: 'major', number: 20 },
  { id: 21, name: 'The World',        suit: 'major', number: 21 },
]

const SUITS = ['wands', 'cups', 'swords', 'pentacles']
const RANKS = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King']

const MINOR_ARCANA = SUITS.flatMap((suit, si) =>
  RANKS.map((rank, ri) => ({
    id: 22 + si * 14 + ri,
    name: `${rank} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
    suit,
    number: ri + 1,
  }))
)

export const TAROT_DECK = [...MAJOR_ARCANA, ...MINOR_ARCANA]

export function drawRandom() {
  return TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)]
}
