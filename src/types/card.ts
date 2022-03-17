import { SemanticWIDTHS } from "semantic-ui-react";
import { newEDevices } from "./sizes";

type TCardTypes = "text";

type TSizes = {
  [key in newEDevices]: SemanticWIDTHS;
};

interface ICardWithButtons {
  onDeleteItemClick: () => any;
  onExpandSizeFromMin?: () => any;
  onEditItemClick?: () => any;
}

interface ITextCard extends ICardWithButtons {
  id: number;
  type: TCardTypes;
  title: string;
  subtitle?: string;
  content?: string;
}

interface ICardComponent extends ICardWithButtons {
  item: ITextCard;
  deviceTabType: newEDevices;
  parentBound?: HTMLElement | null;
  sizes: TSizes;
  setCardSizes: (id: number, sizes: any) => void;
}

const CardVariants: { TEXT: TCardTypes } = {
  TEXT: "text",
};

export { CardVariants };
export type { ITextCard, TCardTypes, ICardComponent, TSizes };
