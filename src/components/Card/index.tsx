import { FC, useRef, useState } from "react";
import { Card, SemanticWIDTHS, Button, Icon, Grid } from "semantic-ui-react";
import { CardVariants, ITextCard, ICardComponent } from "../../types/card";
import { Resizable } from "re-resizable";
import "./style.css";
import parse from "html-react-parser";

const COLUMNS_COUNT = 12;

const calculateColumns = (width: SemanticWIDTHS) => {
  return Math.round((Number(width) / COLUMNS_COUNT) * 16);
};

const TextCard: FC<ITextCard> = ({
  title,
  subtitle,
  content,
  onDeleteItemClick,
  onEditItemClick,
  id,
}: any) => {
  return (
    <>
      <Card fluid style={{ wordBreak: "break-all" }}>
        <Card.Content>
          <Card.Header>
            {title} id: {id}
          </Card.Header>
          <Card.Meta>{subtitle}</Card.Meta>
          <Card.Description style={{ maxHeight: 200, overflow: "hidden" }}>
            {parse(content)}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              basic
              color="green"
              animated="vertical"
              onClick={onEditItemClick}
            >
              <Button.Content hidden>edit</Button.Content>
              <Button.Content visible>
                <Icon name="edit" />
              </Button.Content>
            </Button>
            <Button
              basic
              color="red"
              animated="vertical"
              onClick={onDeleteItemClick}
            >
              <Button.Content hidden>delete</Button.Content>
              <Button.Content visible>
                <Icon name="delete" />
              </Button.Content>
            </Button>
          </div>
        </Card.Content>
      </Card>
      <br />
    </>
  );
};

const WithResize: FC<any> = ({
  children,
  setCardSizes,
  id,
  deviceTabType,
  sizes,
  bounds,
  onExpandSizeFromMin,
}) => {
  const [resizing, setResizing] = useState<boolean>(false);
  const onResizeStop = (e: any, direction: any, ref: any, d: any) => {
    const deltaSize = Math.round((12 * (d.width + 26)) / (1065 - 28));
    const newSize = deltaSize + sizes[deviceTabType];
    const newSizes: any = {};
    newSizes[deviceTabType] = newSize < 12 ? newSize : 12;
    setCardSizes(id, newSizes);
    setResizing(false);
  };

  const onResizeStart = () => {
    setResizing(true);
  };

  const defaultWidth: SemanticWIDTHS = 16;
  const width: any = calculateColumns(sizes[deviceTabType] || defaultWidth);

  return (
    <Grid.Column
      width={width}
      className={`${resizing ? "resizing" : ""}`}
      draggable
    >
      <Resizable
        size={{ width: "auto", height: "auto" }}
        maxHeight={"auto"}
        onResizeStop={onResizeStop}
        grid={[1065 / 12 - 28, 0]}
        enable={{
          top: false,
          right: true,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
        minWidth={1065 / 12 - 28}
        snapGap={(1065 / 12 - 28) / 2}
        onResizeStart={onResizeStart}
        handleComponent={{ right: <div></div> }}
        bounds={bounds}
      >
        {sizes[deviceTabType] > 1 ? (
          children
        ) : (
          <Card fluid>
            <Button icon color="green" onClick={onExpandSizeFromMin}>
              <Icon name="expand arrows alternate" />
            </Button>
          </Card>
        )}
      </Resizable>
    </Grid.Column>
  );
};

const CardComponent = ({
  sizes,
  item,
  setCardSizes,
  parentBound,
  deviceTabType,
  onDeleteItemClick,
  onEditItemClick,
}: ICardComponent) => {
  const onExpandSizeFromMin = () => {
    const { id } = item;
    const newSizes: any = {};
    newSizes[deviceTabType] = 2;
    setCardSizes(id, newSizes);
  };

  switch (item.type) {
    case CardVariants.TEXT:
      return (
        <WithResize
          sizes={sizes}
          setCardSizes={setCardSizes}
          id={item.id}
          deviceTabType={deviceTabType}
          bounds={parentBound}
          onExpandSizeFromMin={onExpandSizeFromMin}
        >
          <TextCard
            {...item}
            onDeleteItemClick={onDeleteItemClick}
            onEditItemClick={onEditItemClick}
          />
        </WithResize>
      );
    default:
      return (
        <WithResize>
          <TextCard
            {...item}
            onDeleteItemClick={onDeleteItemClick}
            onEditItemClick={onEditItemClick}
          />
        </WithResize>
      );
  }
};

export type { ITextCard };
export { CardComponent };
