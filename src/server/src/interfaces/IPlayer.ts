export interface IPlayer {
  id: number;
  socketID?: number;
  name?: string;
  currentBet?: number;
  chipCount?: number;
  isActiveInRound?: boolean;
  pocket: string[];
}
