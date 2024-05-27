import { onValue, push, ref, set } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Item, Table } from "semantic-ui-react";
import { db } from "../firebaseConfig";
import { list } from "firebase/storage";
import { MyContext } from "../App";

export default function Languages2() {
  const { theme } = useContext(MyContext);
  const [text, setText] = useState("");
  const [list, setList] = useState({});

  useEffect(() => {
    onValue(ref(db, "ldata/ethlanguages"), (snapshot) => {
      setList(snapshot.val());
    });
  }, []);

  function addLang() {
    if (!text) return;
    push(ref(db, "ldata/ethlanguages"), { lname: text }).then(
      () => setText(""),
      (err) => window.alert(err.message)
    );
  }

  function delI(key) {
    if (!key) return;
    set(ref(db, `ldata/ethlanguages/${key}`), null);
  }
  return (
    <div>
      <Input value={text} onChange={(e) => setText(e.target.value)} />
      <Button color="blue" onClick={addLang}>
        Add Lang
      </Button>
      <Table
        inverted={theme}
        compact
        unstackable
        size="large"
        celled
        striped
        className="table-custom"
      >
        <thead>
          <th>Languages</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {Object.entries(list).map((item) => (
            <tr>
              <td>{item[1].lname}</td>
              <td>
                <Button color="green">Edit</Button>
                <Button color="red" onClick={() => delI(item[0])}>
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
