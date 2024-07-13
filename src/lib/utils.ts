import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFormattedDate = (date: string | null): string | null => {
  const formatter = new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (date) {
    const startDate = formatter.format(new Date(date));
    return startDate;
  }

  return null;
};

export const getFormattedAmount = (amount: string, currency = "ARS") => {
  const amountFloat = parseFloat(amount);
  let formatted: string;

  switch (currency) {
    case "ARS":
      formatted = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(amountFloat);
      break;
    case "USD":
      formatted = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "symbol",
      }).format(amountFloat);
      break;
    default:
      formatted = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(amountFloat);
      break;
  }

  return formatted;
};
