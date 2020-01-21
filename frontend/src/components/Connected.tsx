import React, { FunctionComponent } from "react";
import { ctx } from "../services/Context";
import { observer } from "mobx-react";
import { OurToaster } from "./OurToaster";
import { Intent } from "@blueprintjs/core/lib/esm/common/intent";
import { Pending } from "./Pending";
import { Client } from "./Client";
import { Banker } from "./Banker";
import {PendingAwaiting} from "./PendingAwaiting";
import {
  Alignment,
  Button,
  Classes,
  Icon,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading
} from "@blueprintjs/core";

export const Connected: FunctionComponent = observer(() => {
  const menu: any =
    ctx.store.getRole() === "client" ? (
      <Client />
    ) : ctx.store.getRole() === "banker" ? (
      <Banker />
    ) : ctx.store.getRole() === "pending" ? (
      <Pending />
    ) : (
      <PendingAwaiting />
    );

  function username(): string {
    return `Signed in as ${ctx.store.getName()}`;
  }

  function home(): any {
    if (ctx.store.getRole() !== "pending" && ctx.store.getRole() !== "pending-awaiting")
      return (
        <Button
          className={"outline-style-d " + Classes.MINIMAL}
          onClick={() => true}
          icon="home"
          text="Home"
        />
      );
  }

  function logout(): void {
    ctx.store.setName("");
    ctx.store.setRole("");
    OurToaster.show({
      message: "Successfully disconnected.",
      intent: Intent.SUCCESS,
      timeout: 8000
    });
  }
  return (
    <div>
      <Navbar className="nav-bar">
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading className="title-primary">Heabank</NavbarHeading>
          <NavbarDivider />
          <NavbarHeading className="title-primary">{username()}</NavbarHeading>
          <NavbarDivider />
          {home()}
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <NavbarDivider />
          <Button
            className={"outline-style-d " + Classes.MINIMAL}
            onClick={() => logout()}
            icon="log-out"
            text="Log-out"
          />
        </NavbarGroup>
      </Navbar>
      {menu}
      <div className="fx -r center footer-welcome">
        <Icon icon="error" />
        <p>Heabank property, all rights reserved.</p>
      </div>
    </div>
  );
});

/*return (
    <div>
        <nav className="bp3-navbar .modifier">
            <div className="bp3-navbar-group bp3-align-left">
                <div className="bp3-navbar-heading">Heabank</div>
                <button className="bp3-button bp3-minimal bp3-icon-home">Home</button>
            </div>
            <div className="bp3-navbar-group bp3-align-right">
                <span className="bp3-navbar-divider"></span>
                <button onClick={() => logout()} className="bp3-button bp3-minimal bp3-icon-log-out">Log-out</button>
            </div>
        </nav>
      {ctx.store.getRole() === "client" ? (
        "client"
      ) : ctx.store.getRole() === "banker" ? (
        "banquier"
      ) : (
        <Pending />
      )}
    </div>
  );
});*/
