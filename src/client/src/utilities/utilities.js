const seatMap = {
  bottomLeft: {
    position: 'absolute',
    marginTop: 180,
    marginLeft: -300
  },
  middleLeft: {
    position: 'absolute',
    marginTop: 70,
    marginLeft: -330
  },
  topLeft: {
    position: 'absolute',
    marginTop: -40,
    marginLeft: -300,
  },
  topMiddle: {
    position: 'absolute',
    marginTop: -70,
    marginLeft: 0,
  },
  topRight: {
    position: 'absolute',
    marginTop: -40,
    marginLeft: 300,
  },
  middleRight: {
    position: 'absolute',
    marginTop: 70,
    marginLeft: 330
  },
  bottomRight: {
    position: 'absolute',
    marginTop: 180,
    marginLeft: 300
  }
}

export const getSeatStyles = (numPlayers) => {
  let seats = [];

  switch (numPlayers) {
    case 0:
      break;
    case 1:
      seats = [
        seatMap.topMiddle,
      ];
      break;
    case 2:
      seats = [
        seatMap.topLeft,
        seatMap.topRight,
      ];
      break;
    case 3:
      seats = [
        seatMap.topLeft,
        seatMap.topMiddle,
        seatMap.topRight,
      ];
      break;
    case 4:
      seats = [
        seatMap.middleLeft,
        seatMap.topLeft,
        seatMap.topRight,
        seatMap.middleRight,
      ];
      break;
    case 5:
      seats = [
        seatMap.middleLeft,
        seatMap.topLeft,
        seatMap.topMiddle,
        seatMap.topRight,
        seatMap.middleRight,
      ];
      break;
    case 6:
      seats = [
        seatMap.bottomLeft,
        seatMap.middleLeft,
        seatMap.topLeft,
        seatMap.topRight,
        seatMap.middleRight,
        seatMap.bottomRight,
      ];
      break;
    case 7:
      seats = [
        seatMap.bottomLeft,
        seatMap.middleLeft,
        seatMap.topLeft,
        seatMap.topMiddle,
        seatMap.topRight,
        seatMap.middleRight,
        seatMap.bottomRight,
      ];
      break;
    default:
      console.log('SeatMap Error, this could get ugly');
      break;
  }

  if (seats.length !== numPlayers) {
    console.log('SeatMap Error, this could get ugly')
  }

  return seats;
}
