// TODO: create a method that builds arrays based on height (modified by aspect ratio) and shuffles
// TODO: to create similar length columns
// TODO: Could just naively add any image to the shortest column
export function quantise<T extends { height: number; width?: number }>(
  arr: T[],
  n: number,
) {
  if (n < 1) throw new Error("n must be greater than one");
  const columns = new Array(n).fill(null).map(() => ({
    totalHeight: 0,
    arr: [],
  })) as { totalHeight: number; arr: T[] }[];

  let nextColumn = 0;
  arr.forEach((item) => {
    columns[nextColumn]!.arr.push(item);
    columns[nextColumn]!.totalHeight += item.height / (item.width ?? 1);

    const minHeight = Math.min(...columns.map((c) => c.totalHeight));
    nextColumn = columns.findIndex((col) => col.totalHeight === minHeight) ?? 0;
  });

  return columns.map((col) => col.arr);
}
