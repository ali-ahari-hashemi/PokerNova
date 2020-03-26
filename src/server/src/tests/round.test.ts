import { expect } from 'chai';
import Round from '../classes/Round';
import { defaultPlayer } from './_mockData';

describe('Round', () => {
  describe('determineWinners()', () => {
    it('should detect a winning hand', () => {
      let player1 = { ...defaultPlayer, id: 1, pocket: ['Qs', 'Kh'] };
      let player2 = { ...defaultPlayer, id: 2, pocket: ['5h', '7d'] };
      let board = ['2s', '3c', 'Qh', '7s', 'Kd'];
      let winners = Round.determineWinners([player1, player2], board);
      expect(winners.ids)
        .to.contain(1)
        .and.not.to.contain(2);
    });

    it('should return the proper winning hand description', () => {
      let player1 = { ...defaultPlayer, id: 1, pocket: ['As', 'Kh'] };
      let player2 = { ...defaultPlayer, id: 2, pocket: ['5h', '7d'] };
      let board = ['2s', '3c', 'Qh', '7s', 'Kd'];
      let winners = Round.determineWinners([player1, player2], board);
      expect(winners.desc).to.equal("Pair, K's");
    });

    it('should detect multiple winners with all common cards', () => {
      let player1 = { ...defaultPlayer, id: 1, pocket: ['Ts', 'Jh'] };
      let player2 = { ...defaultPlayer, id: 2, pocket: ['5h', '7d'] };
      let board = ['As', 'Ac', 'Ah', 'Ks', 'Kd'];
      let winners = Round.determineWinners([player1, player2], board);
      expect(winners.ids)
        .to.contain(1)
        .and.contain(2);
    });

    it('should detect multiple winners with non-common cards', () => {
      let player1 = { ...defaultPlayer, id: 1, pocket: ['Qs', 'Jh'] };
      let player2 = { ...defaultPlayer, id: 2, pocket: ['Qh', '7d'] };
      let board = ['As', 'Ac', 'Ah', 'Ks', '2d'];
      let winners = Round.determineWinners([player1, player2], board);
      expect(winners.ids)
        .to.contain(1)
        .and.contain(2);
    });
  });
});
