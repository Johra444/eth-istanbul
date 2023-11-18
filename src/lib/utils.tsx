type OnChainGroupObject = [string, number, boolean, number, number, number, `0x${string}`, number, number]
type MappedGroup = {
  groupName: string,
  durationDays: number,
  exists: boolean,
  endTime: number,
  totalStake: number,
  baseAmount: number,
  groupOwner: `0x${string}`,
  numberMembers: number,
  numberVotes: number
}

export const arrayToOnchainObject = (onchainObject: OnChainGroupObject): MappedGroup => {
  if (onchainObject.length < 9) {
    return {
      groupName: "",
      durationDays: 0,
      exists: false,
      endTime: 0,
      totalStake: 0,
      baseAmount: 0,
      groupOwner: "0x0",
      numberMembers: 0,
      numberVotes: 0,
    };
  }

  return {
    groupName: onchainObject[0],
    durationDays: onchainObject[1],
    exists: onchainObject[2],
    endTime: onchainObject[3],
    totalStake: onchainObject[4],
    baseAmount: onchainObject[5],
    groupOwner: onchainObject[6],
    numberMembers: onchainObject[7],
    numberVotes: onchainObject[8],
  }
};