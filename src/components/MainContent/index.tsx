import { useReducer, useState, FC, useRef } from "react";

import {
  Container,
  Button,
  Header,
  Segment,
  Sidebar,
  Grid,
  SemanticWIDTHS,
} from "semantic-ui-react";
import { Card, DeviceTabs, TopSideBar, EditCardModal } from "../";
import { ITextCard } from "../../types/card";
import { newEDevices } from "../../types/sizes";

function chunkArray(src: any[], count: number) {
  const result = [];
  for (let s = 0, e = count; s < src.length; s += count, e += count)
    result.push(src.slice(s, e));
  return result;
}

const COLUMNS_COUNT = 12;

// const cardsExample: ICard[] = [
//   {
//     type: "text",
//     sizes: {
//       xs: 11,
//       md: 12,
//       lg: 3,
//     },
//     title: "title",
//     subtitle: "Subtitle",
//     content:
//       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates culpa nesciunt veniam sunt ex iure deserunt vero voluptas nam quis saepe, asperiores ullam recusandae. Omnis vitae atque libero consequuntur enim!",
//   },
//   {
//     type: "text",
//     sizes: {
//       xs: 11,
//       md: 12,
//       lg: 3,
//     },
//     title: "title",
//     subtitle: "Subtitle",
//     content:
//       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates culpa nesciunt veniam sunt ex iure deserunt vero voluptas nam quis saepe, asperiores ullam recusandae. Omnis vitae atque libero consequuntur enim!",
//   },
//   {
//     type: "text",
//     sizes: {
//       xs: 11,
//       md: 12,
//       lg: 3,
//     },
//     title: "title",
//     subtitle: "Subtitle",
//     content:
//       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates culpa nesciunt veniam sunt ex iure deserunt vero voluptas nam quis saepe, asperiores ullam recusandae. Omnis vitae atque libero consequuntur enim!",
//   },
//   {
//     type: "text",
//     sizes: {
//       xs: 11,
//       md: 12,
//       lg: 3,
//     },
//     title: "title",
//     subtitle: "Subtitle",
//     content:
//       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates culpa nesciunt veniam sunt ex iure deserunt vero voluptas nam quis saepe, asperiores ullam recusandae. Omnis vitae atque libero consequuntur enim!",
//   },
//   {
//     type: "text",
//     sizes: {
//       xs: 11,
//       md: 12,
//       lg: 3,
//     },
//     title: "title",
//     subtitle: "Subtitle",
//     content:
//       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates culpa nesciunt veniam sunt ex iure deserunt vero voluptas nam quis saepe, asperiores ullam recusandae. Omnis vitae atque libero consequuntur enim!",
//   },
// ];

function exampleReducer(state: any, action: any) {
  const simpleTextCard: any = {
    id: Math.random(),
    type: "text",
    sizes: {
      xs: 12,
      md: 6,
      lg: 4,
    },
    title: "Title",
    subtitle: "<h1> </h1>",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates culpa nesciunt veniam sunt ex iure deserunt vero voluptas nam quis saepe, asperiores ullam recusandae. Omnis vitae atque libero consequuntur enim!",
  };
  let cards;
  let curCard;
  let curCardIndex;
  switch (action.type) {
    case "ADD_NEW_TEXT_CARD":
      cards = [...state.cards, simpleTextCard];
      return { ...state, cards };
    case "REMOVE_CARD":
      cards = state.cards.filter(({ id }: ITextCard) => id !== action.id);
      return { ...state, cards };
    case "SET_CARD_SIZES":
      curCard = state.cards.find(({ id }: ITextCard) => id === action.id);
      curCardIndex = state.cards.findIndex(
        ({ id }: ITextCard) => id === action.id
      );
      const newSizes = { ...curCard.sizes, ...action.sizes };
      curCard.sizes = newSizes;
      cards = [...state.cards];
      cards[curCardIndex] = { ...curCard };
      return { ...state, cards };
    case "EDIT_CARD":
      curCardIndex = state.cards.findIndex(
        ({ id }: ITextCard) => id === action.card.id
      );
      console.log(
        "🚀 ~ file: index.tsx ~ line 126 ~ exampleReducer ~ curCardIndex",
        curCardIndex
      );
      cards = [...state.cards];
      cards[curCardIndex] = { ...action.card };
      return { ...state, cards };
    default:
      throw new Error();
  }
}

export const MainContent = () => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const [currentEditingCard, setCurrentEditingCard] =
    useState<null | ITextCard>(null);

  const [deviceTabType, setDeviceTabType] = useState<newEDevices>(
    newEDevices.DESKTOP
  );

  const animation = "scale down",
    direction = "top",
    visible = menuOpened;

  const onTabChange: any = (e: any, data: any) => {
    setDeviceTabType(data.panes[data.activeIndex].menuItem.key);
  };

  const [state, dispatch] = useReducer(exampleReducer, {
    cards: [],
  });

  const onCreateNewClick = () => {
    dispatch({ type: "ADD_NEW_TEXT_CARD" });
  };

  const onDeleteItemClick = (id: number) => {
    dispatch({ type: "REMOVE_CARD", id });
  };

  const onEditItemClick = (card: ITextCard) => {
    setCurrentEditingCard(card);
  };

  const onEditCancel = () => {
    setCurrentEditingCard(null);
  };

  const onEditSave = (card: ITextCard) => {
    console.log("🚀 ~ file: index.tsx ~ line 164 ~ onEditSave ~ card", card);
    dispatch({ type: "EDIT_CARD", card });
    setCurrentEditingCard(null);
  };

  const setCardSizes = (id: number, sizes: any) => {
    dispatch({ type: "SET_CARD_SIZES", id, sizes });
  };

  const cardsRows = chunkArray(state.cards, COLUMNS_COUNT);

  const gridRef = useRef(null);

  return (
    <Container>
      <Button.Group>
        <Button active={menuOpened} onClick={() => setMenuOpened(!menuOpened)}>
          Menu
        </Button>
      </Button.Group>

      <Sidebar.Pushable as={Segment} style={{ overflow: "hidden" }}>
        <TopSideBar
          animation={animation}
          direction={direction}
          visible={visible}
        />

        <Sidebar.Pusher>
          <Segment.Group>
            <Segment>
              <Header as="h3">Application Content</Header>
            </Segment>
            <Segment>
              <DeviceTabs onTabChange={onTabChange}>
                <Segment basic>
                  <div
                    ref={gridRef}
                    style={{
                      width: `calc(100% + (100% / ${COLUMNS_COUNT / 2}))`,
                    }}
                  ></div>
                  <Grid padded="vertically">
                    <Grid.Row>
                      {cardsRows.map((row, rowIndex) => {
                        // eslint-disable-next-line no-lone-blocks
                        return row.map((card, cardIndex) => {
                          return (
                            <Card
                              key={card.id}
                              item={card}
                              sizes={card.sizes}
                              onDeleteItemClick={() =>
                                onDeleteItemClick(card.id)
                              }
                              onEditItemClick={() => onEditItemClick(card)}
                              setCardSizes={setCardSizes}
                              deviceTabType={deviceTabType}
                              parentBound={gridRef?.current}
                            />
                          );
                        });
                      })}
                    </Grid.Row>
                  </Grid>
                </Segment>
              </DeviceTabs>
            </Segment>
            <Segment>
              <Button.Group widths="3">
                <Button color="green" icon="pause" onClick={onCreateNewClick}>
                  Add new
                </Button>
                <Button>Specs</Button>
                <Button>Support</Button>
              </Button.Group>
            </Segment>
          </Segment.Group>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      <EditCardModal
        card={currentEditingCard}
        onCancel={onEditCancel}
        onSave={onEditSave}
      />
    </Container>
  );
};
