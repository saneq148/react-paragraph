import {
  Header,
  Segment,
  Sidebar,
  StrictSidebarProps,
  Grid,
  Image,
} from "semantic-ui-react";

export const TopSideBar = ({
  animation,
  direction,
  visible,
}: StrictSidebarProps) => (
  <Sidebar
    as={Segment}
    animation={animation}
    direction={direction}
    visible={visible}
  >
    <Grid textAlign="center">
      <Grid.Row columns={1}>
        <Grid.Column>
          <Header as="h3">New Content Awaits</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={3}>
        <Grid.Column>
          <Image src="/images/wireframe/media-paragraph.png" />
        </Grid.Column>
        <Grid.Column>
          <Image src="/images/wireframe/media-paragraph.png" />
        </Grid.Column>
        <Grid.Column>
          <Image src="/images/wireframe/media-paragraph.png" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Sidebar>
);
