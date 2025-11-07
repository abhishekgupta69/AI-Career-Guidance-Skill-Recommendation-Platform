import React, { useState, useEffect } from 'react'
import TagInput from './TagInput'
import { saveProfile, loadProfile } from './storage'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage(){
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [education, setEducation] = useState('')
  const [email, setEmail] = useState('')
  const [skills, setSkills] = useState([])
  const [interests, setInterests] = useState([])

  useEffect(()=>{
    const p = loadProfile()
    if(p){
      setName(p.name||'')
      setEducation(p.education||'')
      setEmail(p.email||'')
      setSkills(p.skills||[])
      setInterests(p.interests||[])
    }
  }, [])

  function handleSave(){
    if(!name || skills.length===0){
      alert('Please enter name and at least one skill.')
      return
    }
    const profile = { name, education, email, skills, interests, createdAt: new Date().toISOString() }
    saveProfile(profile)
    navigate('/dashboard')
  }

  function handleClear(){
    if(confirm('Clear saved profile?')){
      localStorage.removeItem('ai_career_profile_enhanced_v1')
      setName(''); setEducation(''); setEmail(''); setSkills([]); setInterests([])
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Create / Edit Profile</h2>
          <label className="block mb-2">
            <div className="text-sm text-slate-600">Full name</div>
            <input value={name} onChange={e=>setName(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="Your full name" />
          </label>
          <label className="block mb-2">
            <div className="text-sm text-slate-600">Email</div>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="you@example.com" />
          </label>
          <label className="block mb-2">
            <div className="text-sm text-slate-600">Education</div>
            <input value={education} onChange={e=>setEducation(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="e.g. B.Tech CSE" />
          </label>

          <label className="block mb-4">
            <div className="text-sm text-slate-600 mb-1">Skills (tags)</div>
            <TagInput value={skills} onChange={setSkills} placeholder="javascript, react, python" />
          </label>

          <label className="block mb-4">
            <div className="text-sm text-slate-600 mb-1">Interests (tags)</div>
            <TagInput value={interests} onChange={setInterests} placeholder="AI, Web, Cloud" />
          </label>

          <div className="flex gap-2">
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save & Go to Dashboard</button>
            <button onClick={handleClear} className="px-4 py-2 bg-gray-100 rounded">Clear</button>
          </div>
        </div>
      </div>

      <aside className="bg-white p-6 rounded shadow">
        <h3 className="text-md font-semibold mb-2">Profile Preview</h3>
        <div className="text-sm text-slate-700"><strong>Name:</strong> {name || '—'}</div>
        <div className="text-sm text-slate-700"><strong>Email:</strong> {email || '—'}</div>
        <div className="text-sm text-slate-700"><strong>Education:</strong> {education || '—'}</div>
        <div className="mt-3">
          <div className="text-sm text-slate-600">Skills</div>
          <div className="flex gap-2 flex-wrap mt-2">
            {skills.map((s,i)=>(<span key={i} className="px-3 py-1 bg-slate-100 rounded-full text-sm">{s}</span>))}
          </div>
        </div>
        <div className="mt-3">
          <div className="text-sm text-slate-600">Interests</div>
          <div className="flex gap-2 flex-wrap mt-2">
            {interests.map((s,i)=>(<span key={i} className="px-3 py-1 bg-amber-100 rounded-full text-sm">{s}</span>))}
          </div>
        </div>
      </aside>
    </div>
  )
}
