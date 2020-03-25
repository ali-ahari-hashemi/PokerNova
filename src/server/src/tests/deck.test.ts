import { expect } from 'chai';
import Deck from '../classes/Deck';

describe('Deck', () => {
  let d = new Deck();

  it('should allow you to draw 52 cards', () => {
    for (let i = 0; i != 52; i++) {
      expect(d.draw()).to.be.a('string');
    }
  });
  it('should not allow you to draw past 52 cards', () => {
    expect(d.draw()).to.be.undefined;
  });

  it('should allow you to draw 52 cards after reset + shuffle', () => {
    d.shuffle();
    for (let i = 0; i != 52; i++) {
      expect(d.draw()).to.be.a('string');
    }
  });
});
