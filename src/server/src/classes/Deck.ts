export class Deck {
  private deck: number[] = [];

  constructor() {
    this.reset();
    this.shuffle();
  }

  print(): void {
    console.log(this.deck);
  }

  // Initialize values in deck, 0 - 51
  private reset(): void {
    this.deck = Array.from(new Array(52), (x, i) => i);
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
  draw(): number {
    return this.deck.pop() as number;
  }
}

export default Deck;
