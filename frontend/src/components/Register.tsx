import React, { FunctionComponent, useState } from "react";
import { Button, InputGroup } from "@blueprintjs/core";
import { Intent } from "@blueprintjs/core/lib/esm/common/intent";
import axios from "axios";
import { OurToaster } from "./OurToaster";

export const Register: FunctionComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [mailConfirm, setMailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function registerSubmit(e: any): void {
    e.preventDefault();
    if (formIsCorrect()) {
      axios
        .post(`http://localhost:5000/users_pending`, {
          id: null,
          role: "pending",
          password: password,
          firstName: firstName,
          lastName: lastName,
          mail: mail,
          birthDate: null,
          phone: null,
          address: null,
          zipCode: null,
          city: null,
          country: null
        })
        .then(() => {
          OurToaster.show({
            message:
              "User successfully created ! You can now log in with your login and your password.",
            intent: Intent.SUCCESS,
            timeout: 30000
          });
          setFirstName("");
          setLastName("");
          setMail("");
          setMailConfirm("");
          setPassword("");
          setPasswordConfirm("");
        })
        .catch(error => {
          console.log(error);
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
    if (mail !== mailConfirm) {
      OurToaster.show({
        message: "Mail and mail confirm must be equals !",
        intent: Intent.DANGER
      });
      return false;
    }
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) {
      OurToaster.show({
        message:
          "Password need more complexity ! It must be more than 8 characters, with one digit, one" +
          " upper case letter and one special symbol !",
        intent: Intent.DANGER,
        timeout: 10000
      });
      return false;
    }
    if (password !== passwordConfirm) {
      OurToaster.show({
        message: "Password and password confirm must be equals !",
        intent: Intent.DANGER
      });
      return false;
    }
    return true;
  }

  function validateForm(): boolean {
    return (
      mail.length > 0 &&
      mailConfirm.length > 0 &&
      password.length > 0 &&
      passwordConfirm.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0
    );
  }

  return (
    <div>
      <form onSubmit={registerSubmit}>
        <div className="inputgroup fx -c">
          <div className="fx -r">
            <InputGroup
              placeholder="First Name"
              required={true}
              value={firstName}
              onChange={(ev: any) => setFirstName(ev.currentTarget.value)}
            />
            <InputGroup
              placeholder="Last Name"
              required={true}
              value={lastName}
              onChange={(ev: any) => setLastName(ev.currentTarget.value)}
            />
          </div>

          <InputGroup
            placeholder="Mail address"
            required={true}
            value={mail}
            onChange={(ev: any) => setMail(ev.currentTarget.value)}
          />
          <InputGroup
            placeholder="Confirm mail address"
            required={true}
            value={mailConfirm}
            onChange={(ev: any) => setMailConfirm(ev.currentTarget.value)}
          />
          <InputGroup
            placeholder="Password"
            type="password"
            required={true}
            value={password}
            onChange={(ev: any) => setPassword(ev.currentTarget.value)}
          />
          <InputGroup
            placeholder="Confirm password"
            type="password"
            required={true}
            value={passwordConfirm}
            onChange={(ev: any) => setPasswordConfirm(ev.currentTarget.value)}
          />
          <Button
            className="outline-style-d"
            icon="tick-circle"
            type="submit"
            disabled={!validateForm()}
          >
            Create an account
          </Button>
        </div>
      </form>
    </div>
  );
};
