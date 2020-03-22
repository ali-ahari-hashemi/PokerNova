export class Deck {
    deck: number[];

    constructor() {
        this.deck = Array.from(new Array(52), (x, i) => i)
        this.shuffle()
    }

    print(): void {
        console.log(this.deck)
    }

    // Stack Shuffle
    shuffle(): void {
        let count = this.deck.length;
        while(count) {
            this.deck.push(this.deck.splice(Math.floor(Math.random() * count), 1)[0]);
            count -= 1;
        }
    }

    draw(): number {
        return this.deck.pop() as number;
    }
}

export default Deck;
