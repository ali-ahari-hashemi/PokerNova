var Hand = require('pokersolver').Hand;

export interface IPlayerCards {
  id: number;
  cards: string[];
}

export interface IHandWinners {
  ids: number[];
  desc: string;
}

export class CardHelpers {
  // Returns the best hand name that can be made for a given set of cards
  static determineHandName(cards: string[]): string {
    if (cards.length > 0) {
      let hand = Hand.solve(cards);
      return hand.name;
    }
    return 'N/A';
  }
  // Given multiple sets of cards associated with player id,
  // returns the id(s) of the player(s) with the winning hand
  // and hand description
  static determineWinners(playerCards: IPlayerCards[]) {
    let hands: string[][] = [];
    for (let playerCardSet of playerCards) {
      hands.push(Hand.solve(playerCardSet.cards));
    }

    const winningHands = Hand.winners(hands);

    // This lib doesn't provide an easy way to access who actually won,
    // so transform out list representations of winning hands that matches our format
    let winningHandsCards: string[][] = winningHands.map((hand: { toString: () => string }) => {
      return hand
        .toString()
        .split(', ')
        .map((card: string) => {
          // Convert "10" to "T" because for some reason they decided it would be a good idea
          // to represent the 10 card inconsistently .
          return card.startsWith('10') ? 'T' + card[2] : card;
        });
    });

    // Determine ids of winning hand based on which players' cards contain the winning hand:
    // Iterate through each winning hand, match the players' set of cards which contains all the
    // cards in the winning hand - pull out that player's ID
    let winningIds: number[] = [];
    winningHandsCards.forEach((winningHand) => {
      playerCards.forEach((playerCardSet) => {
        if (
          winningHand.every((card: string) => {
            return playerCardSet.cards.includes(card);
          })
        ) {
          winningIds.push(playerCardSet.id);
        }
      });
    });

    return {
      ids: winningIds,
      desc: winningHands[0].descr,
    };
  }
}
