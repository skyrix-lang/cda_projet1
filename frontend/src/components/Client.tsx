import React, { FunctionComponent, useState } from "react";
import { ctx } from "../services/Context";
import { H2, H4 } from "@blueprintjs/core";
import { observer } from "mobx-react";

export const Client: FunctionComponent = observer(() => {
  return (
    <div>
      <H2>Bienvenue {ctx.store.getName()}, vous êtes client chez Heabank !</H2>
      <H4>PANEL :</H4>
    </div>
  );
});
