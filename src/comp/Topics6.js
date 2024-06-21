import { onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Table } from "semantic-ui-react";
import { db } from "../firebaseConfig";

export default function Topics6() {
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
  const [edittopicid, setEdittopicid] = useState(null);

  // Use Effection Function
  useEffect(() => {
    onValue(ref(db, "data/topics"), (snapshot) => {
      if (!snapshot.exists()) {
        setList({});
        return;
      }
      setList(snapshot.val());
    });
  }, []);

  // Adding Function
  function addTopic() {
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
  function delTopic(key = "") {
    if (!key) return;
    set(ref(db, `data/topics/${key}`), null);
  }
  // Editing Function
  function editTopic(key = "") {
    setEdittopicid(key);
    setTopicname(list[key].name);
    setCategoryname(list[key].category);
  }

  return (
    <div>
      <Form>
        <Form.Field>
          <label>Topic Name</label>
          <Input
            autoFocus
            placeholder={"Enter Topic"}
            value={topicname}
            onChange={(e) => setTopicname(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Category Name</label>
          <Select
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
        <Form.Field>
          <Button color="green" onClick={addTopic}>
            ADD
          </Button>
        </Form.Field>
      </Form>
      <Table>
        <thead>
          <th>Topic</th>
          <th>Category</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {Object.entries(list).map((item) => (
            <tr>
              <td>{item[1].name}</td>
              <td>{categories[item[1].category]}</td>
              <td>
                <Button color="blue" onClick={() => editTopic(item[0])}>
                  EDIT
                </Button>
              </td>
              <td>
                <Button color="red" onClick={() => delTopic(item[0])}>
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
