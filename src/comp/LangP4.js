import { onValue, push, ref, set } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { Button, Grid, Input, Table } from "semantic-ui-react";
import { MyContext } from "../App";

export default function LangP4() {
  const { theme } = useContext(MyContext);
  const [text, setText] = useState("");
  const [list, setList] = useState({});

  useEffect(() => {
    onValue(ref(db, "ethdata/ethlang"), (snapshot) => {
      if (!snapshot.exists) {
        setList({});
        return;
      }
      setList(snapshot.val());
    });
  }, []);

  function addIt() {
    if (!text) return;
    push(ref(db, "ethdata/ethlang"), { langname: text }).then(
      () => setText(""),
      (err) => window.alert(err.message)
    );
  }

  function delItem(key) {
    set(ref(db, `ethdata/ethlang/${key}`), null);
  }

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Input value={text} onChange={(e) => setText(e.target.value)} />
        </Grid.Row>
        <Grid.Row>
          <Button onClick={addIt}>Add Lang</Button>
        </Grid.Row>
      </Grid>
      <Table inverted={theme} compact size="large" unstackable>
        <thead>
          <th>Language</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {Object.entries(list).map((item) => (
            <tr>
              <td>{item[1].langname}</td>
              <td>
                <Button color="blue">Edit</Button>
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
