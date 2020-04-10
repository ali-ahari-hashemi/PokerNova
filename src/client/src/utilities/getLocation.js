export const getLocation = (seat) => {
  switch (seat) {
    case 0:
      return 'top';
    case 1:
      return 'top';
    case 2:
      return 'right';
    case 3:
      return 'right';
    case 4:
      return 'bottom';
    case 5:
      return 'bottom';
    case 6:
      return 'left';
    case 7:
      return 'left';
    default:
      return '';
  }
};
