export type CategoryRouteScreen = "PLP" | "CLP";

export interface CategoryRoute {
  screen: CategoryRouteScreen;
  params: { id: string };
}

export interface CategoryNode {
  id: string;
  name: string;
  image: string;
  route: CategoryRoute;
  children: CategoryNode[];
}

export interface BrandsNode {
  id: string;
  name: string;
  image: string;
  // route will always go to BrandListPlaceholder
  route: { screen: "BRAND_LIST" };
}

export interface CategoryTreeResponse {
  categories: CategoryNode[];
  brands: BrandsNode;
}
