export type HighlightInternalScreen = "PLP" | "CLP" | "PD";

export type HighlightRoute =
  | {
      src: "INTERNAL";
      screen: HighlightInternalScreen;
      params: { id: string };
    }
  | {
      src: "EXTERNAL";
      url: string;
    };

export interface HighlightCard {
  id: string;
  title: string;
  image: string;
  route: HighlightRoute;
}
