import React, { FunctionComponent, useState } from "react";
import { ctx } from "../services/Context";
import { Button, InputGroup, Tooltip } from "@blueprintjs/core";
import { observer } from "mobx-react";
import { Intent } from "@blueprintjs/core/lib/esm/common/intent";
import axios from "axios";
import { OurToaster } from "./OurToaster";

export const Login: FunctionComponent = observer(() => {
  const [showPassword, setShowPassword] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const lockButton = (
    <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`}>
      <Button
        className="outline-style-d"
        icon={showPassword ? "unlock" : "lock"}
        intent={Intent.WARNING}
        minimal={true}
        onClick={() => setShowPassword(!showPassword)}
      />
    </Tooltip>
  );

  function loginSubmit(e: any) {
    e.preventDefault();
    if (formIsCorrect()) {
      axios
        .get(`http://localhost:5000/users/${mail}/${password}`)
        .then(response => {
          ctx.store.setName(
            response.data.firstName + " " + response.data.lastName
          );
          ctx.store.setRole(response.data.role);
          ctx.store.setId(response.data.id);

          OurToaster.show({
            message: "Successfully connected !",
            intent: Intent.SUCCESS,
            timeout: 8000
          });
        })
        .catch(err => {
          console.log(err);
        });
      axios
        .get(`http://localhost:5000/users_pending/${mail}/${password}`)
        .then(response => {
          ctx.store.setName(
            response.data.firstName + " " + response.data.lastName
          );
          ctx.store.setRole(response.data.role);
          ctx.store.setId(response.data.id);

          OurToaster.show({
            message: "Successfully connected !",
            intent: Intent.SUCCESS,
            timeout: 8000
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  function formIsCorrect(): boolean {
    if (!mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      OurToaster.show({
        message: "Mail address isn't valid.",
        intent: Intent.DANGER
      });
      return false;
    }
    return true;
  }

  function validateForm() {
    return mail.length > 0 && password.length > 0;
  }

  return (
    <div>
      <form onSubmit={loginSubmit}>
        <div className="inputgroup fx -c">
          <InputGroup
            leftIcon="user"
            placeholder="Username"
            required={true}
            value={mail}
            onChange={(ev: any) => setMail(ev.currentTarget.value)}
          />
          <InputGroup
            placeholder="Password"
            leftIcon="key"
            rightElement={lockButton}
            type={showPassword ? "text" : "password"}
            required={true}
            value={password}
            onChange={(ev: any) => setPassword(ev.currentTarget.value)}
          />
          <Button
            className="outline-style-d"
            icon="tick-circle"
            type="submit"
            disabled={!validateForm()}
          >
            Connection
          </Button>
        </div>
      </form>
    </div>
  );
});
