import { onValue, push, ref } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Label, Select, Table } from "semantic-ui-react";
import { db } from "../firebaseConfig";
import { MyContext } from "../App";

export default function Topics() {
  const { theme } = useContext(MyContext);
  const [ttext, setTtext] = useState("");
  const [ctext, setCtext] = useState("");
  const cats = ["", "Structures", "Conversation", "Vocabulary", "Grammar"];
  const [list, setList] = useState({});

  // Use Effect to display topics with category
  useEffect(() => {
    onValue(ref(db, "data/topics"), (snapshot) => {
      if (!snapshot.exists) {
        setList("");
        return;
      }
      setList(snapshot.val());
    });
  }, []);

  // Add Function
  function addTopic() {
    push(ref(db, "data/topics"), { name: ttext, category: ctext }).then(
      () => setTtext(""),
      (err) => window.alert(err.message)
    );
  }
  return (
    <div>
      <Form>
        <Form.Field>
          <Label>Topic</Label>
          <Input value={ttext} onChange={(e) => setTtext(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <Label>Category</Label>
          <Select
            value={ctext}
            onChange={(e, d) => setCtext(d.value)}
            options={[
              { key: "1", value: "1", text: "Structures" },
              { key: "2", value: "2", text: "Conversation" },
              { key: "3", value: "3", text: "Vocabulary" },
              { key: "4", value: "4", text: "Grammar" },
            ]}
          />
        </Form.Field>
        <Button color="green" onClick={addTopic}>
          Add Topic
        </Button>
      </Form>
      <hr />
      <Table inverted={theme} unstackable size="large">
        <thead>
          <th>Toics</th>
          <th>Category</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {Object.entries(list).map((Item) => (
            <tr>
              <td>{Item[1].name}</td>
              <td>{cats[Item[1].category]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
