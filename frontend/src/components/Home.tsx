import React, { FunctionComponent } from "react";
import { ctx } from "../services/Context";
import { observer } from "mobx-react";
import { Connected } from "./Connected";
import { Welcome } from "./Welcome";
import "../styles/main.scss";

export const Home: FunctionComponent = observer(() => {
  return (
    <div className="fx -c">
      {ctx.store.session.name === "" ? (
        <Welcome default_tab={"lg"} />
      ) : (
        <Connected />
      )}
    </div>
  );
});
