import React, { FunctionComponent, useState } from "react";
import { H2, Icon, Tab, Tabs } from "@blueprintjs/core";
import { Register } from "./Register";
import { Login } from "./Login";
import forbesLogo from "../images/Forbes_logo.svg";

export const Welcome: FunctionComponent<{ default_tab: string }> = props => {
  const [tab, setTab] = useState(props.default_tab);

  return (
    <div className="body">
      <div className="welcome-all">
        <div className="fx -r center">
          <div className="curve-border">
            <H2 className="title-primary">Heabank</H2>
            <p className="helvetica p-welcome">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum
              dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
              dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="curve-border">
            <Tabs
              id="TabsExample"
              className="tab-indicator"
              selectedTabId={tab}
            >
              <Tab
                id="lg"
                title="Login"
                onClickCapture={() => setTab("lg")}
                panel={<Login />}
                panelClassName="test-panel"
                className="outline-style-d tab-primary"
              />
              <Tab
                id="rg"
                title="Register"
                onClickCapture={() => setTab("rg")}
                panel={<Register />}
                panelClassName="ember-panel"
                className="outline-style-d tab-primary"
              />
              <Tabs.Expander />
            </Tabs>
          </div>
        </div>
        <div className="fx -r center forbes">
          <img className="bank-logo" alt="forbes" src={forbesLogo} />
          <p className="times">” Heabank named best bank in the world ! ”</p>
        </div>
        <div className="fx -r center footer-welcome">
          <Icon icon="error" />
          <p>Heabank property, all rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
