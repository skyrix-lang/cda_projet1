import React, { FunctionComponent, useState } from "react";
import { Button, FileInput, H1, H6, InputGroup } from "@blueprintjs/core";
import { observer } from "mobx-react";
import axios from "axios";
import { OurToaster } from "./OurToaster";
import { Intent } from "@blueprintjs/core/lib/esm/common/intent";
import { ctx } from "../services/Context";

export const Pending: FunctionComponent = observer(() => {
  const [date, setDate] = useState(new Date());
  const [file, setFile] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const dateString = date.toString();

  function registerSubmit(e: any): void {
    e.preventDefault();
    if (formIsCorrect()) {
      axios
        .put(`http://localhost:5000/users_pending/${ctx.store.getId()}`, {
          id: ctx.store.getId(),
          role: "pending-awaiting",
          password: null,
          firstName: null,
          lastName: null,
          mail: null,
          birthDate: dateString,
          phone: phone.toString(),
          address: address,
          zipCode: zipCode.toString(),
          city: city,
          country: country
        })
        .then(() => {
          OurToaster.show({
            message:
              "Request sent !",
            intent: Intent.SUCCESS,
            timeout: 8000
          });
          ctx.store.setRole("pending-awaiting");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  function formIsCorrect(): boolean {
    return true;
  }

  function validateForm(): boolean {
    return (
      address.length > 0 &&
      zipCode.length > 0 &&
      city.length > 0 &&
      country.length > 0
    );
  }

  return (
    <div className="body">
      <div className="connected-body">
        <div className="curve-border">
          <div className="fx -c center">
            <div>
              <H1 className="title-primary">Welcome to Heabank !</H1>
              <H6 className="title-primary">
                Hello dear customer, to finalize your registration, please fill
                in the various fields below. A banker will then be in charge of
                your file in order to process your registration request. You
                will be able to reconnect whenever you want to follow the status
                of your application.
              </H6>
            </div>
            <div>
              <form onSubmit={registerSubmit}>
                <div className="login-inputgroup fx -c">
                  <InputGroup
                    type="date"
                    placeholder="Date"
                    required={true}
                    value={dateString}
                    onChange={(ev: any) => setDate(ev.currentTarget.value)}
                  />
                  <FileInput
                    text="ID..."
                    onInputChange={(e: any) => setFile(e.currentTarget.value)}
                  />
                  <InputGroup
                    type="number"
                    size={10}
                    placeholder="Phone"
                    required={true}
                    value={phone}
                    onChange={(ev: any) => setPhone(ev.currentTarget.value)}
                  />
                </div>
                <div className="inputgroup fx -c">
                  <InputGroup
                    placeholder="Address"
                    required={true}
                    value={address}
                    onChange={(ev: any) => setAddress(ev.currentTarget.value)}
                  />
                  <div className="fx -r">
                    <InputGroup
                      type="number"
                      placeholder="ZipCode"
                      required={true}
                      value={zipCode}
                      onChange={(ev: any) => setZipCode(ev.currentTarget.value)}
                    />
                    <InputGroup
                      placeholder="Country"
                      required={true}
                      value={country}
                      onChange={(ev: any) => setCountry(ev.currentTarget.value)}
                    />
                  </div>
                  <InputGroup
                    placeholder="City"
                    required={true}
                    value={city}
                    onChange={(ev: any) => setCity(ev.currentTarget.value)}
                  />
                </div>
                <Button
                  className="outline-style-d"
                  icon="tick-circle"
                  type="submit"
                  disabled={!validateForm()}
                >
                  Confirm my subscription
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
