import { onValue, push, ref, set } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Item,
  Label,
  Modal,
  Select,
  Table,
} from "semantic-ui-react";
import { db } from "../firebaseConfig";
import { MyContext } from "../App";

export default function Topics() {
  const { theme } = useContext(MyContext);
  const [ttext, setTtext] = useState("");
  const [ctext, setCtext] = useState("");
  const cats = ["", "Structures", "Conversation", "Vocabulary", "Grammar"];
  const [list, setList] = useState({});
  const [editid, setEditid] = useState(null);

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
    if (!ttext) return;
    push(ref(db, "data/topics"), { name: ttext, category: ctext }).then(
      () => setTtext(""),
      (err) => window.alert(err.message)
    );
    clsBox();
  }
  // Deleting Funtion
  function delItem(key = "") {
    if (!key) return;
    set(ref(db, `data/topics/${key}`), null);
  }

  // Edit Function
  function editItem(key = "") {
    if (!key) return;
    setEditid(key);
    setTtext(list[key].name);
    setCtext(list[key].category);
  }

  // Save Function
  function saveItem() {
    if (!editid) return;
    set(ref(db, `data/topics/${editid}`), { name: ttext, category: ctext });
    setEditid(null);
    clsBox();
  }

  //Close Box Function
  function clsBox() {
    setEditid(null);
    setTtext("");
    setCtext("");
  }

  return (
    <div>
      <Modal open={editid !== null} closeIcon onClose={clsBox}>
        <Modal.Header>{editid === "" ? "ADD" : "EDIT"} Item</Modal.Header>
        <Modal.Content>
          <Form onSubmit={editid === "" ? addTopic : saveItem}>
            <Form.Field>
              <Label>Topic name</Label>
              <Input
                autoFocus
                placeholder={"Topic Name"}
                value={ttext}
                onChange={(e) => setTtext(e.target.value)}
              />
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
          </Form>
        </Modal.Content>
        <Modal.Actions>
          {editid === "" ? (
            <Button color="green" onClick={addTopic}>
              ADD
            </Button>
          ) : (
            <Button color="blue" onClick={saveItem}>
              SAVE
            </Button>
          )}
          <Button color="gray" onClick={clsBox}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>

      <hr />
      <Button color="green" onClick={() => setEditid("")}>
        Add New Topic
      </Button>
      <Table inverted={theme} unstackable size="large">
        <thead>
          <th>Toics</th>
          <th>Category</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {Object.entries(list).map((item) => (
            <tr>
              <td>{item[1].name}</td>
              <td>{cats[item[1].category]}</td>
              <td>
                <Button color="green" onClick={() => editItem(item[0])}>
                  EDIT
                </Button>{" "}
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
