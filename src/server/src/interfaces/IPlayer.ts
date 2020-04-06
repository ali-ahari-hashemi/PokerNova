export interface IPlayer {
  id: number;
  socketId?: string;
  name: string;
  currentBet: number;
  chipCount: number;
  isActiveInRound: boolean;
  pocket: string[];
  status: string;
}
