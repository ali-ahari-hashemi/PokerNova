const hands = {
  8: "Straight Flush",
  7: "Four of a Kind",
  6: "Full House",
  5: "Flush",
  4: "Straight",
  3: "Three of a Kind",
  2: "Two Pair",
  1: "Pair",
  0: "High Card"
};

export default class CardHelpers {
  static getHand(cards: string[]) {
    return CardHelpers.testPair(cards) || "High Card";
  }

  private static testPair(cards: string[]) {
    for (let i = 0; i != cards.length; i++) {
      const currRank = cards[i][0];
      for (let j = i + 1; j < cards.length; j++) {
        if (cards[j][0] === currRank) return "Pair";
      }
    }
    return false;
  }
}
