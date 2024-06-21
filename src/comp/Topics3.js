import { onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Label,
  Modal,
  Select,
  Table,
} from "semantic-ui-react";
import { db } from "../firebaseConfig";

export default function Topics3() {
  const [topoicname, setTopicname] = useState("");
  const [list, setList] = useState({});
  const [categoryname, SetCategoryname] = useState("");
  const categories = [
    "",
    "Structures",
    "Conversation",
    "Vocabulary",
    "Grammar",
  ];
  const [edittopicname, setEdittopicname] = useState(null);
  const [changetopicname, SetChangetopicname] = useState("");

  // Use Effect Function
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
  function addItem() {
    if (!topoicname) return;
    push(ref(db, "data/topics"), {
      name: topoicname,
      category: categoryname,
    }).then(
      () => setTopicname(""),
      (err) => window.alert(err.message)
    );
  }

  // Delete Function
  function delItem(key = "") {
    if (!key) return;
    set(ref(db, `data/topics/${key}`), null);
  }

  // Editing Function
  function editTopic(key = "") {
    if (!key) return;
    setEdittopicname(key);
    SetChangetopicname(list[key].name);
    SetCategoryname(list[key].category);
  }

  // Save Function
  function saveItem() {
    if (!edittopicname) return;
    set(ref(db, `data/topics/${edittopicname}`), {
      name: topoicname,
      category: categoryname,
    });
  }
  function clsBox() {
    setEdittopicname(null);
    SetChangetopicname("");
    SetCategoryname("");
  }
  return (
    <div>
      <Modal open={edittopicname}>
        <Modal.Header>Edit the topic and category Name</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Edit Toic Name</label>
              <Input
                value={changetopicname}
                onChange={(e, d) => setEdittopicname(d.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={saveItem}>
            Save
          </Button>
          <Button color="gray" onClick={clsBox}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>

      <Form>
        <Form.Field>
          <Label>Add Topic Name</Label>
          <Input
            autoFocus
            placeholder={"Topic Name"}
            value={topoicname}
            onChange={(e) => setTopicname(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Label>Select Category</Label>
          <Select
            value={categoryname}
            onChange={(e, d) => SetCategoryname(d.value)}
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
        Add
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
                <Button color="blue" onClick={() => editTopic(item[0])}>
                  EDIT
                </Button>
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
