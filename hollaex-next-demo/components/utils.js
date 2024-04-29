import numbro from "numbro";
import { number, format, floor, pow, multiply, fraction } from 'mathjs';

export const getNetworkNameByKey = (network) => {
  if (network) {
    switch (network) {
      case "eth":
        return "ERC20";
      case "trx":
        return "TRC20";
      case "bnb":
        return "BEP20";
      case "klay":
        return "Klaytn";
      case "matic":
        return "Polygon";
      case "sol":
        return "Solana";
      case "xlm":
        return "Stellar";
      default:
        return network.toUpperCase();
    }
  } else {
    return network;
  }
};

// Function to split an array into parts of a specific size
export const chunkArray = (arr, size) => {
  const chunkedArr = [];
  let index = 0;

  while (index < arr.length) {
    chunkedArr.push(arr.slice(index, index + size));
    index += size;
  }

  return chunkedArr;
};

// Function to get a random element from each subarray and combine them into a single array
export const getLastValuesFromParts = (arr) => {
  const partSize = arr.length / 24;
  const partsOf7 = chunkArray(arr, partSize);

  // Get random values from each part
  const randomValues = partsOf7.map((part) => {
    return part[part.length - 1];
  });

  return randomValues;
};

export const roundNumber = (number = 0, decimals = 4) => {
	if (number === 0 || number === Infinity || isNaN(number)) {
		return 0;
	} else if (decimals > 0) {
		const multipliedNumber = multiply(
			fraction(number),
			pow(10, decimals)
		);
		const dividedNumber = math.divide(
			math.floor(multipliedNumber),
			math.pow(10, decimals)
		);
		return number(dividedNumber);
	} else {
		return floor(number);
	}
};

export const PERCENTAGE_FORMAT = "0.[00]%";

export const formatPercentage = (value = 0) =>
  numbro(number(value / 100)).format(PERCENTAGE_FORMAT);

export const getFormat = (min = 0, fullFormat, amount) => {
  let value = format(min, { notation: "fixed" });
  if (fullFormat) {
    return { digit: 8, format: "0,0.[00000000]" };
  } else if (min % 1) {
    let point = value.toString().split(".")[1]
      ? value.toString().split(".")[1]
      : "";
    let res = point
      .split("")
      .map((val) => 0)
      .join("");
    return { digit: point.length, format: `0,0.[${res}]` };
  } else {
    if (amount) {
      const [digitsBeforeDecimal] = amount?.toString().split(".");
      return digitsBeforeDecimal.length > 4
        ? { digit: 0, format: `0,0` }
        : { digit: 4, format: `0,0.[0000]` };
    }

    return { digit: 4, format: `0,0.[0000]` };
  }
};

export const formatToCurrency = (amount = 0, min = 0, fullFormat = false) => {
  let formatObj = getFormat(min, fullFormat, amount);
  return numbro(roundNumber(amount, formatObj.digit)).format(formatObj.format);
};
