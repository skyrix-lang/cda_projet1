import React, { FunctionComponent, useState } from "react";
import { H1, H6 } from "@blueprintjs/core";
import { observer } from "mobx-react";

export const PendingAwaiting: FunctionComponent = observer(() => {
  return (
    <div className="body">
      <div className="connected-body">
        <div className="fx -c center">
          <div className="curve-border">
            <H1 className="title-primary">Awaiting validation !</H1>
            <H6 className="title-primary">
              Hello dear customer, your request is currently being processed by
              one of our bankers. Please be patient, you will soon be with us.
            </H6>
          </div>
        </div>
      </div>
    </div>
  );
});
