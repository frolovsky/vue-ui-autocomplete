let IDX = 36;
let HEX = "";
while (IDX--) HEX += IDX.toString(36);

export default (len = 11): string => {
  let str = "";
  while (len--) str += HEX[(Math.random() * 36) | 0];
  return str;
};
