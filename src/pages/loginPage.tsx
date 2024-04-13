import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const loginPage = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <div className="flex justify-center h-screen items-center">
        <Card className="w-3/4 w-full">
          <div className="flex justify-evenly items-center">
            <div className="">
              <div className="bg-gray-300 w-96 h-96"></div>
            </div>
            <div className="w-1/2">
              <h2 className="font-semibold text-2xl">Sign In</h2>
              <div className="p-inputgroup flex-1 my-6">
                <span className="p-inputgroup-addon bg-cyan-400">
                  <i className="pi pi-user text-white"></i>
                </span>
                <span className="p-float-label">
                  <InputText id="username" />
                  <label htmlFor="username">Username</label>
                </span>{" "}
              </div>
              <div className="p-inputgroup flex-1 my-6">
                <span className="p-inputgroup-addon bg-cyan-400">
                  <i className="pi pi-lock text-white"></i>
                </span>
                <span className="p-float-label">
                  <Password
                    inputId="password"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    feedback={false}
                  />
                  <label htmlFor="password">Password</label>
                </span>
              </div>
              <button className="bg-cyan-400 hover:bg-cyan-600 p-2 text-white w-full rounded-md">
                Submit
              </button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default loginPage;
