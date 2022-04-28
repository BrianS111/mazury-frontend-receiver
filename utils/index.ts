import axios from 'axios';
import { Profile, Referral, Skill } from 'types';
import { theme } from '../tailwind.config';

export const getTruncatedAddress = (
  address: string | undefined | null,
  length: number = 10
): string => {
  if (!address) {
    return '';
  }

  return `${address.slice(0, length)}...${address.slice(
    address.length - length
  )}`;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const goToLink = (link: string) => {
  window.open(link, '_blank');
};

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}

export function toCapitalizedWord(word: string) {
  var words = word.match(/[A-Za-z][a-z]*/g) || [];
  return words.map(capitalize).join(' ');
}

export const colors = theme.extend.colors;

type MonthDigit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const getMonthName = (month: MonthDigit) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[month - 1];
};

export const getMonthAndYear = (date: Date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${getMonthName(month as MonthDigit).slice(0, 3)} ${year}`;
};

export const skillsList: Skill[] = [
  'frontendDev',
  'backendDev',
  'smartContractDev',
  'protocolDev',
  'design',
  'growthMarketing',
  'writing',
  'productManagement',
  'projectManagement',
  'dataScience',
  'art',
  'defiDegen',
  'nftDegen',
  'teaching',
  'memes',
  'community',
];

export const toCamelCase = (text: string) => {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (leftTrim, index) =>
      index === 0 ? leftTrim.toLowerCase() : leftTrim.toUpperCase()
    )
    .replace(/\s+/g, '');
};

// Scans an array of referrals and finds out if the user has already referred someone
export const hasAlreadyReferredReceiver = (
  referrals: Referral[],
  receiver: string,
  author: string
) => {
  return referrals.find((referral) => {
    return (
      referral.receiver.eth_address === receiver &&
      referral.author.eth_address === author
    );
  });
};

export const getTwitterConnectionPopupLink = (ethAddress: string) => {
  return `https://twitter.com/intent/tweet?text=I'm%20verifying%20myself%20for%20%40mazuryxyz%20%F0%9F%8C%8A%0a%0a${ethAddress}`;
};

/**
 * Returns '-' if the value is null or undefined, otherwise returns the value. Useful because 0 || '-' returns '-'
 */
export const getMetricDisplayValue = (
  value: number | null | undefined,
  placeholder: string = '-'
) => {
  return value === null || value === undefined ? placeholder : value;
};

export const commify = (value: number) => {
  let numberString: string | string[] = String(value);

  numberString = numberString.split('').reverse();

  numberString = numberString.reduce((prev, next, index) => {
    let shouldComma = (index + 1) % 3 === 0 && index + 1 < numberString.length;

    let updatedValue = `${prev}${next}`;

    if (shouldComma) {
      updatedValue = `${updatedValue},`;
    }

    return updatedValue;
  }, '');

  numberString = numberString.split('').reverse().join('');

  return numberString;
};

const detectIfEthAddress = (str: string) => {
  return /^(0x)?[0-9a-f]{40}$/i.test(str);
};

export const returnTruncatedIfEthAddress = (
  str: string,
  length: number = 10
) => {
  if (detectIfEthAddress(str)) {
    return getTruncatedAddress(str, length);
  }
  return str;
};
