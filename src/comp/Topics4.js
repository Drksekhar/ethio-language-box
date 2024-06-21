import { onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Label, Select, Table } from "semantic-ui-react";
import { db } from "../firebaseConfig";

export default function Topics4() {
  const [topicname, setTopicname] = useState("");
  const [categoryname, setCategoryname] = useState("");
  const categories = [
    "",
    "Structures",
    "Conversation",
    "Vocabulary",
    "Grammar",
  ];
  const [list, setList] = useState({});

  //use Effect
  useEffect(() => {
    onValue(ref(db, "data/topics"), (snapshot) => {
      if (!snapshot.exists()) {
        setList("");
        return;
      }
      setList(snapshot.val());
    });
  }, []);

  //Adding Function
  function addItem() {
    if (!topicname) return;
    push(ref(db, "data/topics"), {
      name: topicname,
      category: categoryname,
    }).then(
      () => setTopicname(""),
      (err) => window.alert(err.message)
    );
  }

  // Deleting Function
  function delItem(key = "") {
    if (!key) return;
    set(ref(db, `data/topics/${key}`), null);
  }

  return (
    <div>
      <Form>
        <Form.Field>
          <Label>Topic Name</Label>
          <Input
            autoFocus
            placeholder={"Enter Topic Name"}
            value={topicname}
            onChange={(e) => setTopicname(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Label>Select Category</Label>
          <Select
            placeholder="select category"
            value={categoryname}
            onChange={(e, d) => setCategoryname(d.value)}
            options={[
              { key: "1", value: "1", text: "Structures" },
              { key: "2", value: "2", text: "Conversation" },
              { key: "3", value: "3", text: "Vocabulary" },
              { key: "4", value: "4", text: "Grammar" },
            ]}
          />
        </Form.Field>
      </Form>
      <Button color="green" onClick={addItem}>
        ADD
      </Button>
      <Table>
        <thead>
          <th>Topic</th>
          <th>Category</th>
          <th>Action</th>
        </thead>
        <tbody>
          {Object.entries(list).map((item) => (
            <tr>
              <td>{item[1].name}</td>
              <td>{categories[item[1].category]}</td>

              <td>
                <Button color="yellow">EDIT</Button>
                <Button color="red" onClick={() => delItem(item[0])}>
                  DELETE
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
