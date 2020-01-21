import React, { FunctionComponent, useState } from "react";
import { ctx } from "../services/Context";
import { H2, H4 } from "@blueprintjs/core";
import { observer } from "mobx-react";

export const Banker: FunctionComponent = observer(() => {
  return (
    <div>
      <H2>
        Bienvenue {ctx.store.getName()}, vous êtes banquier chez Heabank !
      </H2>
      <H4>Voici les différents clients en attente :</H4>
    </div>
  );
});
