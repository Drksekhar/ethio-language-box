import { onValue, push, ref } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Label } from "semantic-ui-react";
import { db } from "../firebaseConfig";
import { MyContext } from "../App";

export default function Statements() {
  const { theme } = useContext(MyContext);
  const [name, setName] = useState({});
  const [list, setList] = useState("");

  useEffect(() => {
    onValue(ref(db, "data/statements"), (sanpshot) => {
      if (!sanpshot.exists()) return;
      setList({});
      setList(sanpshot.val());
    });
  }, []);
  function addItem() {
    push(ref(db, "data/statements"), { name: name });
    setName("");
  }
  return (
    <div style={{ maxWidth: 650, margin: "auto" }}>
      <Form onSubmit={addItem} inverted={theme}>
        <Form.Field>
          <Label>Statement </Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Field>
        <Button color="green">Add</Button>
      </Form>
    </div>
  );
}
