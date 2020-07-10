export const formatTimeString = timeString => {
  const re = /-/g;
  return timeString.slice(0, 10).replace(re, '.');
};

export const formatStarCount = starCount => {
  if (starCount > 1000) {
    let count = (Math.floor(starCount / 1000) * 1000) / 1000 + 'K';
    return count;
  }
  return starCount;
};
