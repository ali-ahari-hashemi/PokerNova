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

  describe('bet', () => {
    before(() => {
      action = { actionType: ActionType.bet };
    });

    it('should return false if your bet is less than 0', () => {
      action = { ...action, betAmount: -10 };
      let player = { ...defaultPlayer };
      let round = { ...defaultRound };
      const a = new Action({ action, player, round });

      expect(a.performAction()).to.be.false;
    });

    it('should return false if your bet is greater than your balance', () => {
      action = { ...action, betAmount: 10 };
      let player = { ...defaultPlayer, chipCount: 5 };
      let round = { ...defaultRound };
      const a = new Action({ action, player, round });

      expect(a.performAction()).to.be.false;
    });

    it('should return false if your bet is less than a call', () => {
      action = { ...action, betAmount: 10 };
      let player = { ...defaultPlayer, chipCount: 100 };
      let round = {
        ...defaultRound,
        pots: [{ isOpen: true, size: 20, eligibleWinners: new Set<number>() }],
        highestBet: 20,
      };
      const a = new Action({ action, player, round });

      expect(a.performAction()).to.be.false;
    });

    it('should update pot when a player goes all-in', () => {
      action = { ...action, betAmount: 10 };
      let player = { ...defaultPlayer, chipCount: 10 };
      let round = { ...defaultRound };
      const a = new Action({ action, player, round });

      expect(a.performAction()).to.be.true;
      // need to figure out side pot behavior
      expect(round.pots[0].size).to.equal(10);
    });

    it('should update chip count to 0 when a player goes all-in', () => {
      action = { ...action, betAmount: 10 };
      let player = { ...defaultPlayer, chipCount: 10 };
      let round = { ...defaultRound };
      const a = new Action({ action, player, round });

      expect(a.performAction()).to.be.true;
      // need to figure out side pot behavior
      expect(player.chipCount).to.equal(0);
    });

    it('should update playersAllIn when a player goes all-in', () => {
      action = { ...action, betAmount: 10 };
      let player = { ...defaultPlayer, chipCount: 10 };
      let round = { ...defaultRound };
      const a = new Action({ action, player, round });

      expect(a.performAction()).to.be.true;
      expect(round.playersAllIn).to.contain(player.id);
    });

    it('should update pot when a player calls', () => {
      action = { ...action, betAmount: 10 };
      let player = { ...defaultPlayer, chipCount: 20 };
      let round = {
        ...defaultRound,
        pots: [{ isOpen: true, size: 10, eligibleWinners: new Set<number>() }],
        highestBet: 10,
      };
      const a = new Action({ action, player, round });

      expect(a.performAction()).to.be.true;
      expect(round.pots[0].size).to.equal(20);
    });

    it('should update chip count when a player calls', () => {
      action = { ...action, betAmount: 10 };
      let player = { ...defaultPlayer, chipCount: 20 };
      let round = {
        ...defaultRound,
        pots: [{ isOpen: true, size: 10, eligibleWinners: new Set<number>() }],
        highestBet: 10,
      };
      const a = new Action({ action, player, round });

      expect(a.performAction()).to.be.true;
      // need to figure out side pot behavior
      expect(player.chipCount).to.equal(10);
    });

    it('should not update highest bet when a player calls', () => {
      action = { ...action, betAmount: 10 };
      let player = { ...defaultPlayer, chipCount: 20 };
      let round = {
        ...defaultRound,
        pots: [{ isOpen: true, size: 10, eligibleWinners: new Set<number>() }],
        highestBet: 10,
      };
      const a = new Action({ action, player, round });

      expect(a.performAction()).to.be.true;
      expect(round.highestBet).to.equal(10);
    });

    it('should not update stopping point when a player calls', () => {
      action = { ...action, betAmount: 10 };
      let player = { ...defaultPlayer, chipCount: 20 };
      let round = {
        ...defaultRound,
        pots: [{ isOpen: true, size: 10, eligibleWinners: new Set<number>() }],
        highestBet: 10,
      };
      const a = new Action({ action, player, round });

      expect(a.performAction()).to.be.true;
      expect(round.stoppingPoint).to.equal(defaultRound.stoppingPoint);
    });

    it('should update pot when a valid bet is placed', () => {
      action = { ...action, betAmount: 20 };
      let player = { ...defaultPlayer, chipCount: 50 };
      let round = {
        ...defaultRound,
        pots: [{ isOpen: true, size: 10, eligibleWinners: new Set<number>() }],
        highestBet: 10,
      };
      const a = new Action({ action, player, round });

      expect(a.performAction()).to.be.true;
      expect(round.pots[0].size).to.equal(30);
    });

    it('should update chip count when a valid bet is placed', () => {
      action = { ...action, betAmount: 20 };
      let player = { ...defaultPlayer, chipCount: 50 };
      let round = {
        ...defaultRound,
        pots: [{ isOpen: true, size: 10, eligibleWinners: new Set<number>() }],
        highestBet: 10,
      };
      const a = new Action({ action, player, round });

      expect(a.performAction()).to.be.true;
      expect(player.chipCount).to.equal(30);
    });

    it('should update highest bet when a valid bet is placed', () => {
      action = { ...action, betAmount: 20 };
      let player = { ...defaultPlayer, chipCount: 50 };
      let round = {
        ...defaultRound,
        pots: [{ isOpen: true, size: 10, eligibleWinners: new Set<number>() }],
        highestBet: 10,
      };
      const a = new Action({ action, player, round });

      expect(a.performAction()).to.be.true;
      expect(round.highestBet).to.equal(20);
    });

    it('should update stopping point when a valid bet is placed', () => {
      action = { ...action, betAmount: 20 };
      let player = { ...defaultPlayer, chipCount: 50 };
      let round = {
        ...defaultRound,
        pots: [{ isOpen: true, size: 10, eligibleWinners: new Set<number>() }],
        highestBet: 10,
      };
      const a = new Action({ action, player, round });

      expect(a.performAction()).to.be.true;
      expect(round.stoppingPoint).to.equal(player.id);
    });
  });
});
