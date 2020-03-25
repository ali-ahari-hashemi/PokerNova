import { expect } from 'chai';
import { Action } from '../classes/Action';
import { defaultPlayer, defaultRound } from './_mockData';
import { ActionType } from '../constants';
import { IAction } from '../interfaces/IAction';

describe('Action', () => {
  let action: IAction;

  describe('fold', () => {
    before(() => {
      action = { actionType: ActionType.fold };
    });

    it('should result in inactive player', () => {
      let player = { ...defaultPlayer, currentBet: 0 };
      let round = { ...defaultRound, highestBet: 0 };
      const a = new Action({ action, player, round });

      expect(a.performAction()).to.be.true;
      expect(player.isActiveInRound).to.be.false;
    });

    it('should add player to playersFolded', () => {
      let action = { actionType: ActionType.fold };
      let player = { ...defaultPlayer, currentBet: 0 };
      let round = { ...defaultRound, highestBet: 0 };
      const a = new Action({ action, player, round });

      expect(a.performAction()).to.be.true;
      expect(round.playersFolded).to.contain(player.id);
    });
  });

  describe('check', () => {
    before(() => {
      action = { actionType: ActionType.check };
    });

    it('should return true if your current bet equals maximum bet', () => {
      let player = { ...defaultPlayer, currentBet: 0 };
      let round = { ...defaultRound, highestBet: 0 };
      const a = new Action({ action, player, round });

      expect(a.performAction()).to.be.true;
    });

    it('should return false if your current bet is less than maximum bet', () => {
      let player = { ...defaultPlayer, currentBet: 0 };
      let round = { ...defaultRound, highestBet: 10 };
      const a = new Action({ action, player, round });

      expect(a.performAction()).to.be.false;
    });
  });
});
