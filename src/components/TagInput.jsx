import React, { useState } from 'react'

export default function TagInput({ value, onChange, placeholder }){
  const [text, setText] = useState('')

  function addTagFromText(){
    const v = text.trim()
    if(!v) return
    const parts = v.split(',').map(s=>s.trim()).filter(Boolean)
    const newTags = Array.from(new Set([...(value||[]), ...parts]))
    onChange(newTags)
    setText('')
  }

  function removeTag(tag){
    onChange((value||[]).filter(t=>t!==tag))
  }

  return (
    <div className="border rounded p-2 bg-white">
      <div className="flex gap-2 flex-wrap mb-2">
        {(value||[]).map((t,i)=>(
          <button key={i} onClick={()=>removeTag(t)} className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-sm">{t} ✕</button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={e=>setText(e.target.value)}
          onKeyDown={e=>{ if(e.key==='Enter'){ e.preventDefault(); addTagFromText() } }}
          placeholder={placeholder || 'Type and press Enter or comma'}
          className="flex-1 px-3 py-2 border rounded"
        />
        <button type="button" onClick={addTagFromText} className="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
      </div>
    </div>
  )
}
