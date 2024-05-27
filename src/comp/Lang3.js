import { onValue, push, ref, set } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { Button, Input, Table } from "semantic-ui-react";
import { list } from "firebase/storage";
import { MyContext } from "../App";

export default function Lang3() {
  const { theme } = useContext(MyContext);
  const [text, setText] = useState("");
  const [list, setList] = useState({});

  useEffect(() => {
    onValue(ref(db, "ethdata/ethlang"), (sanpshot) => {
      if (!sanpshot.exists) {
        setList({});
        return;
      }
      setList(sanpshot.val());
    });
  }, []);

  function addL() {
    if (!text) return;
    push(ref(db, "ethdata/ethlang"), { langname: text }).then(
      () => setText(""),
      (err) => window.alert(err.message)
    );
  }

  function delItem(key) {
    if (!key) return;
    set(ref(db, `ethdata/ethlang/${key}`), null);
  }

  return (
    <div>
      <Input value={text} onChange={(e) => setText(e.target.value)} />
      <Button onClick={addL}>Add Lang</Button>
      <Table inverted={theme} compact size="large" unstackable>
        <thead>
          <th>Language Names</th>
          <th>Actions</th>
        </thead>

        <tbody>
          {Object.entries(list).map((item) => (
            <tr>
              <td>{item[1].langname}</td>
              <td>
                <Button color="green">Edit</Button>
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
