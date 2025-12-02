export const generateMockList = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `mock-${i}`,
    title: `Item ${i + 1}`,
    description:
      "This is a placeholder description for demonstration purposes.",
    image: `https://placehold.co/400x400/png`,
  }));
};
