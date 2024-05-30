import { onValue, push, ref, set } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  Button,
  Form,
  FormField,
  Grid,
  Input,
  Modal,
  Table,
} from "semantic-ui-react";
import { MyContext } from "../App";

export default function Languages() {
  const { theme } = useContext(MyContext);
  const [text, setText] = useState("");
  const [list, setList] = useState({});
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    onValue(ref(db, "data/languages"), (snapshot) => {
      if (!snapshot.exists) {
        setList({});
        return;
      }
      //setList(snapshot.val());

      setList(snapshot.val());
    });
  }, []);

  function addLanguage() {
    if (!text) return;
    push(ref(db, "data/languages"), { name: text }).then(
      () => setText(""),
      (err) => window.alert(err.message)
    );
  }

  function deleteItem(key = "") {
    if (!key) return;
    set(ref(db, `data/languages/${key}`), null);
  }
  // Edit Function
  function editItem(key = "") {
    if (!key) return;
    setId(key);
    setName(list[key].name);
  }
  // Save Function
  function saveItem() {
    if (!id) return;
    set(ref(db, `data/languages/${id}`), { name });
    setId("");
  }

  // Close Box
  function closeBox() {
    setId("");
    setName("");
  }

  return (
    <div>
      <Input
        placeholder={"Enter Language Name"}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <Button color="green" onClick={addLanguage}>
        Add Language
      </Button>
      <Modal open={id} onClose={closeBox} closeIcon size="mini">
        <Modal.Header style={{ textAlign: "center" }}>
          Change the Language Name
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              {/*}  <label style={{ textAlign: "center", display: "block" }}>
                Previous Name
  </label>*/}
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="blue" onClick={saveItem}>
            Save
          </Button>
          <Button color="grey" onClick={closeBox}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
      <Table inverted={theme} size="large" unstackable compact>
        <thead>
          <th style={{ border: "1px solid black", padding: "10px" }}>
            List of Language
          </th>
          <th style={{ border: "1px solid black", padding: "10px" }}>Action</th>
        </thead>
        <tbody>
          {Object.entries(list).map((item) => (
            <tr>
              <td>{item[1].name}</td>
              <td>
                <Button color="green" onClick={() => editItem(item[0])}>
                  Edit
                </Button>
                <Button color="red" onClick={() => deleteItem(item[0])}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
