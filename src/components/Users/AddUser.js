import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [errorMsg, setErrorMsg] = useState();
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const addUserHandler = (event) => {
    event.preventDefault();
    const refName = nameInputRef.current.value;
    const refAge = ageInputRef.current.value;
    if (refName.trim().length === 0 || refAge.trim().length === 0) {
      setErrorMsg({
        title: "INVALID INPUT",
        message: "check the entered data again",
      });
      return;
    }
    if (+refAge < 1) {
      setErrorMsg({ title: "INVALID AGE", message: "Age Can't be negative" });
      return;
    }
    props.onAddUser(refName, refAge);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setErrorMsg(null);
  };

  return (
    <div>
      {errorMsg && (
        <ErrorModal
          title={errorMsg.title}
          message={errorMsg.message}
          closeModal={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef}></input>
          <label htmlFor="age">Age</label>
          <input id="age" type="number" ref={ageInputRef}></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
