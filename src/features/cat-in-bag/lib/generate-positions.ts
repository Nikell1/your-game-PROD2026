interface CellPosition {
  themeIndex: number;
  priceIndex: number;
}

export function getRandomCellPositions(
  themesCount: number,
  pricesCount: number,
  count: number,
): CellPosition[] {
  const totalCells = themesCount * pricesCount;
  const actualCount = Math.min(count, totalCells);

  const positions: CellPosition[] = [];
  const usedIndices = new Set<number>();

  while (positions.length < actualCount) {
    const randomIndex = Math.floor(Math.random() * totalCells);

    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);

      positions.push({
        themeIndex: Math.floor(randomIndex / pricesCount),
        priceIndex: randomIndex % pricesCount,
      });
    }
  }

  return positions;
}
