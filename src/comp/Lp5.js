import { onValue, push, ref, set } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Item, Table } from "semantic-ui-react";
import { db } from "../firebaseConfig";

export default function Lp5() {
  const [text, setText] = useState("");
  const [list, setList] = useState({});

  useEffect(() => {
    onValue(ref(db, "data/languages"), (snapshot) => {
      if (!snapshot.exists) {
        setList({});
      }
      //setList(snapshot.val());
      setList(snapshot.val() || {});
    });
  }, []);
  // Adding Function
  function addFunc() {
    push(ref(db, "data/languages"), { name: text }).then(
      () => setText(""),
      (err) => window.alert(err.message)
    );
  }
  // On Key press
  function enteKeyFun(e) {
    if (e.key === "Enter") {
      addFunc();
    }
  }

  function delFun(key = " ") {
    if (!key) return;
    set(ref(db, `data/languages/${key}`), null);
  }

  return (
    <div>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onClick={enteKeyFun}
      />
      <Button onClick={addFunc}>Add Language</Button>
      <Table>
        <thead>
          <th>Languages</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {Object.entries(list).map((item) => (
            <tr>
              <td>{item[1].name}</td>
              <td>
                <Button onClick={() => delFun(item[0])}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
