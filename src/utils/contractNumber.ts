export function generateContractNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const timestamp = Date.now();
  const counter = Math.floor((timestamp % 1000000) / 10);
  return `CONT-${year}-${String(counter).padStart(3, '0')}`;
}
