export const convertDateToTimestamp = (input?: string): string => {
   const dateString = input ?? getTodayDate();
   const date = new Date(dateString.replace(' ', 'T') + 'Z');
   const milliseconds = 93;
   date.setMilliseconds(milliseconds);
   const isoString = date.toISOString();
   return isoString;
}

const getTodayDate = (): string => {
   const date = new Date();

   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0');
   const day = String(date.getDate()).padStart(2, '0');
   const hours = String(date.getHours()).padStart(2, '0');
   const minutes = String(date.getMinutes()).padStart(2, '0');
   const seconds = String(date.getSeconds()).padStart(2, '0');

   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}