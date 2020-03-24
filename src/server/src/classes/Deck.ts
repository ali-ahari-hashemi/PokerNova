import { ranks, suits } from "../constants";

export class Deck {
  private deck: string[] = [];

  constructor() {
    this.reset();
    this.shuffle();
  }

  print(): void {
    console.log(this.deck);
  }

  // Initialize values in deck
  private reset(): void {
    let tempDeck: string[] = [];
    for (let suit of suits) {
      for (let rank of ranks) {
        tempDeck.push(rank + suit);
      }
    }
    this.deck = tempDeck;
  }

  // Reset deck and perform Stack Shuffle
  shuffle(): void {
    this.reset();
    let count = this.deck.length;
    while (count) {
      this.deck.push(this.deck.splice(Math.floor(Math.random() * count), 1)[0]);
      count -= 1;
    }
  }

  // Pop card at top of deck
  draw(): string {
    return this.deck.pop() as string;
  }
}

export default Deck;
