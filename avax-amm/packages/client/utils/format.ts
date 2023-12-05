// PRECISIONありのshareに変換します。
export const formatWithPrecision = (share: string, precision: string) => {
  return BigInt(share) * BigInt(precision);
};

// PRECISIONなしのshareに変換します。
export const formatWithoutPrecision = (share: string, precision: string) => {
  return (BigInt(share) / BigInt(precision)).toString();
};
