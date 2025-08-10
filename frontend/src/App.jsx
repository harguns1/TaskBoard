import React, { useEffect, useState } from "react"
import axios from "axios"

export default function App() {
  const [boards, setBoards] = useState([])
  const [name, setName] = useState("")
  const api = import.meta.env.VITE_API_URL || "http://localhost:8080"

  useEffect(() => {
    axios.get(api + "/api/boards").then(r => setBoards(r.data))
  }, [])

  async function addBoard() {
    if (!name) return
    const r = await axios.post(api + "/api/boards", { name })
    setBoards([...boards, { ...r.data, lists: [] }])
    setName("")
  }

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>TaskBoard</h1>
      <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
        <input placeholder="New board name" value={name} onChange={e => setName(e.target.value)} />
        <button onClick={addBoard}>Add</button>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {boards.map(b => (
          <div key={b.id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
            <h3>{b.name}</h3>
            <div>Lists: {b.lists?.length || 0}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

