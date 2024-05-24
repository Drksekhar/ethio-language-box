import { push, ref } from 'firebase/database'
import React, { useState } from 'react'
import { Button, Input } from 'semantic-ui-react'
import { db } from '../firebaseConfig'

export default function Languages() {
    const [text, setText] = useState('')

    function addLanguage(){
if(!text) return
                push(ref(db, 'data/languages'), text)
        .then(() => setText(''), (err) => window.alert(err.message))
    }
  return (
    <div>
      <Input value={text} onChange={e => setText(e.target.value)} />
      <Button onClick={addLanguage}>Add Language</Button>
        </div>
  )
}
