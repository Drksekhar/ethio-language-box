import { onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Table } from "semantic-ui-react";
import { db } from "../firebaseConfig";

export default function Topics5() {
  const [topicname, SetTopicname] = useState("");
  const [categoryname, setCategoryname] = useState("");
  const categories = [
    "",
    "Structures",
    "Conversation",
    "Vocabulary",
    "Conversation",
  ];
  const [list, setList] = useState({});

  // useeffect function
  useEffect(() => {
    onValue(ref(db, "data/topics"), (snapshot) => {
      if (!snapshot.exists()) {
        setList({});
        return;
      }
      setList(snapshot.val());
    });
  }, []);

  // Addinf Function
  function addI() {
    if (!topicname) return;
    push(ref(db, "data/topics"), {
      name: topicname,
      category: categoryname,
    }).then(
      () => SetTopicname(""),
      (err) => window.alert(err.message)
    );
  }
  // Del Function
  function delI(key = "") {
    if (!key) return;
    set(ref(db, `data/topics/${key}`), null);
  }
  return (
    <div>
      <Form>
        <Form.Field>
          <Input
            autoFocus
            placeholder={"Enter Topic"}
            value={topicname}
            onChange={(e) => SetTopicname(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Select
            value={categoryname}
            onChange={(e, d) => setCategoryname(d.value)}
            options={[
              { ket: "1", value: "1", text: "Structures" },
              { ket: "2", value: "2", text: "Conversation" },
              { ket: "3", value: "3", text: "Vocabulary" },
              { ket: "4", value: "4", text: "Conversation" },
            ]}
          />
        </Form.Field>
      </Form>
      <Button color="green" onClick={addI}>
        ADD
      </Button>
      <Table>
        <thead>
          <th> Topics</th>
          <th> Category</th>
          <th> Actions</th>
        </thead>
        <tbody>
          {Object.entries(list).map((item) => (
            <tr>
              <td>{item[1].name}</td>
              <td>{categories[item[1].category]}</td>
              <td>
                <Button color="blue">EDIt</Button>
              </td>
              <td>
                <Button color="red" onClick={() => delI(item[0])}>
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
