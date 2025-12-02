export type RootStackParamList = {
  CategoryEntry: undefined;
  CategoryLevel: {
    categoryId: string;
    categoryName: string;
  };
  ProductListPlaceholder: {
    source: "category" | "highlight";
    id: string;
    screenType: "PLP" | "CLP" | "PD";
  };
  BrandListPlaceholder: undefined;
};
