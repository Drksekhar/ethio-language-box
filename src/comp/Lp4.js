import { onValue, push, ref, serverTimestamp, set } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Table } from "semantic-ui-react";
import { db } from "../firebaseConfig";
import { list } from "firebase/storage";
import { MyContext } from "../App";

export default function Lp4() {
  const [text, setText] = useState("");
  const [list, setList] = useState({});
  const { theme } = useContext(MyContext);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    onValue(ref(db, "ethdata/ethlang"), (snapshot) => {
      if (!snapshot.exists) {
        setList("");
        return;
      }
      setList(snapshot.val());
    });
  }, []);

  function addLang() {
    push(ref(db, "ethdata/ethlang"), { langname: text }).then(
      () => setText(""),
      (err) => window.alert(err.message)
    );
  }
  // Delet Funtion
  function delFun(key = "") {
    if (!key) return;
    set(ref(db, `ethdata/ethlang/${key}`), null);
  }

  // Edit Function
  function editFun(key = "") {
    if (!key) return;
    setId(key);
    setName(list[key].langname);
  }
  // Savev Function
  function saveFun() {
    if (!id) return;
    set(ref(db, `ethdata/ethlang/${id}`), { name });
    setId("");
    // setName(list[id].langname);
  }
  // Close Box
  function clsBox() {
    setId("");
    setName("");
  }
  return (
    <div>
      <Input value={text} onChange={(e) => setText(e.target.value)} />
      <Button onClick={addLang}>Add Languages</Button>
      <Modal open={id} onClose={clsBox} closeIcon size="mini">
        <Modal.Header>Edit the language Name</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={saveFun}>
            Save
          </Button>
          <Button color="gray" onClick={clsBox}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>

      <Table inverted={theme} unstackable compact size="large ">
        <thead>
          <th>List of Languages</th>
          <th>Actions</th>
        </thead>
        {Object.entries(list).map((item) => (
          <tr>
            <td>{item[1].langname}</td>
            <td>
              <Button color="green" onClick={(e) => editFun(item[0])}>
                EDIT
              </Button>
              <Button color="red" onClick={(e) => delFun(item[0])}>
                DELETE
              </Button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
