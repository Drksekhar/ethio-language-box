import { onValue, push, ref, set } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { Button, Input, Table } from "semantic-ui-react";
import { MyContext } from "../App";

export default function Languages() {
  const { theme } = useContext(MyContext);
  const [text, setText] = useState("");
  const [list, setList] = useState({});

  useEffect(() => {
    onValue(ref(db, "data/languages"), (snapshot) => {
      if (!snapshot.exists) {
        setList({});
        return;
      }
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

  function deleteItem(key) {
    if (!key) return;
    set(ref(db, `data/languages/${key}`), null);
  }

  return (
    <div>
      <Input value={text} onChange={(e) => setText(e.target.value)} />
      <Button color="green" onClick={addLanguage}>
        Add Language
      </Button>
      <Table inverted={theme} size="large" unstackable compact>
        <thead>
          <th>Language</th>
          <th>Action</th>
        </thead>
        <tbody>
          {Object.entries(list).map((item) => (
            <tr>
              <td>{item[1].name}</td>
              <td>
                <Button color="blue">Edit</Button>
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
