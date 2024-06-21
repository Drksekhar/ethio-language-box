import { onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Table } from "semantic-ui-react";
import { db } from "../firebaseConfig";

export default function Languages9() {
  const [lname, setLname] = useState("");
  const [llist, setLlist] = useState("");

  // USE EFF
  useEffect(() => {
    onValue(ref(db, "data/languages"), (snapshot) => {
      if (!snapshot.exists()) {
        setLlist({});
        return;
      }
      setLlist(snapshot.val());
    });
  }, []);

  // ADD FUN
  function addItem() {
    if (!lname) return;
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

  return (
    <div>
      <Form>
        <Form.Field>
          <Input value={lname} onChange={(e) => setLname(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <Button color="green" onClick={addItem}>
            {" "}
            ADD
          </Button>
        </Form.Field>
      </Form>
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
                <Button color="blue">EDIT</Button>
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
