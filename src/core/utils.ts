export const mapDateFromApi = (isoDate: string): Date => new Date(isoDate)

export const mapAmountFromApi = (amount: number): number => amount / 100

export const range = (min: number, max: number) => (value: number) => {
  if (value < min) {
    return min
  }
  if (value > max) {
    return max
  }
  return value
}
