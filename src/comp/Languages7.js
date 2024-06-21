import { onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Table } from "semantic-ui-react";
import { db } from "../firebaseConfig";

export default function Languages7() {
  const [langname, setLangname] = useState("");
  const [listoflang, setListoflang] = useState({});
  const [editid, setEditid] = useState("");
  const [chname, setChname] = useState("");

  // Use Effect Fun
  useEffect(() => {
    onValue(ref(db, "data/languages"), (sanpshot) => {
      if (!sanpshot.exists()) {
        setListoflang({});
        return
      }
      setListoflang(sanpshot.val());
    });
  }, []);

  //ADDING FUN
  function addLang() {
    push(ref(db, "data/languages"), { name: langname }).then(
      () => setLangname(""),
      (err) => window.alert(err.message)
    );
  }

  // DELTEING FUN
  function delLang(key = "") {
    set(ref(db, `data/languages/${key}`), null);
  }
  //EDIT FUN
  function editLang(key = "") {
    if (!key) return;
    setEditid(key);
    setChname(listoflang[key].name);
  }

  //SAVE FUN
  // function saveLang() {
  //   if (!editid) return;
  //   set(ref(db, `data/languages/${editid}`), { name:chname });
  //   setEditid("");
  // }
  function saveLang() {
    if (!editid) return;
    set(ref(db, `data/languages/${editid}`), { name: chname });
    setEditid("");
    // setName(list[id].langname);
  }

  // Close BoX
  function clsBox() {
    setEditid("");
    setChname("");
  }
  return (
    <div>
      <Modal open={editid} closeIcon onClose={clsBox}>
        <Modal.Header>Change the Name</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                autoFocus
                placeholder={"chnage the name"}
                value={chname}
                onChange={(e) => setChname(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={saveLang}>
            SAVE
          </Button>
          <Button color="gray" onClick={clsBox}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
      <Form>
        <Form.Field>
          <Input
            value={langname}
            onChange={(e) => setLangname(e.target.value)}
          />
        </Form.Field>
      </Form>
      <Button color="green" onClick={addLang}>
        ADD Lnag
      </Button>
      <Table>
        <thead>
          <th>Languags</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {Object.entries(listoflang).map((item) => (
            <tr>
              <td>{item[1].name}</td>
              <td>
                <Button color="blue" onClick={() => editLang(item[0])}>
                  EDIT
                </Button>
                <Button color="red" onClick={() => delLang(item[0])}>
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
