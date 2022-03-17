import { FC } from "react";
import { Tab } from "semantic-ui-react";
import { newEDevices } from "../../types/sizes";

interface IDeviceTabs {
  onTabChange: () => any;
}

export const DeviceTabs: FC<IDeviceTabs> = ({ children, onTabChange }) => {
  const panes: {
    menuItem: { key: string; icon: string; content: string };
    render?: any;
  }[] = [
    {
      menuItem: {
        key: newEDevices.DESKTOP,
        icon: "desktop",
        content: "Desktop",
      },
    },
    {
      menuItem: {
        key: newEDevices.TABLET,
        icon: "tablet alternate",
        content: "Tablet",
      },
    },
    {
      menuItem: {
        key: newEDevices.MOBILE,
        icon: "mobile alternate",
        content: "Mobile",
      },
    },
  ];

  const render: any = () => <Tab.Pane>{children}</Tab.Pane>;

  return (
    <Tab
      panes={panes.map((pane) => {
        pane.render = render;
        return pane;
      })}
      onTabChange={onTabChange}
    />
  );
};
