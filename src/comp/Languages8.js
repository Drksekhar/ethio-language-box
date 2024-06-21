import { onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Table } from "semantic-ui-react";
import { db } from "../firebaseConfig";

export default function Languages8() {
  const [lname, setLname] = useState("");
  const [llist, setLlist] = useState({});
  const [editid, setEditid] = useState("");
  const [chname, setChname] = useState("");

  // Use Eff
  useEffect(() => {
    onValue(ref(db, "data/languages"), (snapshot) => {
      if (!snapshot.exists()) {
        setLlist({});
      }
      setLlist(snapshot.val());
    });
  }, []);

  // FUN ADD
  function addItem() {
    push(ref(db, "data/languages"), { name: lname }).then(
      () => setLname(""),
      (err) => window.alert(err.message)
    );
  }

  // DEL FUN
  function delItem(key = "") {
    if (!key) return;
    set(ref(db, `data/languages/${key}`), null);
  }
  // EDIT FUN
  function editItem(key = "") {
    setEditid(key);
    setChname(llist[key].name);
  }

  // SAVE FUN
  function saveItem() {
    if (!editid) return;
    set(ref(db, `data/languages/${editid}`), { name: chname });
    setEditid("");
  }
  // FUN CLOSE BOX
  function clsBox() {
    setEditid("");
    setChname("");
  }
  return (
    <div>
      <Form>
        <Form.Field>
          <Input value={lname} onChange={(e) => setLname(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <Button color="green" onClick={addItem}>
            ADD
          </Button>
        </Form.Field>
      </Form>

      <Modal open={editid} closeIcon onClose={clsBox}>
        <Modal.Header>Change</Modal.Header>
        <Modal.Content>
          <Input value={chname} onChange={(e) => setChname(e.target.value)} />
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={saveItem}>
            SAVE
          </Button>
          <Button color="gray" onClick={clsBox}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
      <Table>
        <thead>
          <th>Languages</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {Object.entries(llist).map((item) => (
            <tr>
              <td>{item[1].name}</td>
              <td>
                <Button color="blue" onClick={() => editItem(item[0])}>
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
