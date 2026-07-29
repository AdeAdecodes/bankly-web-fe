function genNum(min = 0, max = Number.MAX_VALUE) {
  return Math.round(min + Math.random() * (max - min));
}

export default genNum;
