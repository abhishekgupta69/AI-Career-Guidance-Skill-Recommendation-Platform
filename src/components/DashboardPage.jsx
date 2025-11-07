import React, { useEffect, useState } from 'react'
import { loadProfile, clearProfile } from './storage'
import { useNavigate } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function scoreCareer(career, profile){
  const skills = (profile.skills||[]).map(s=>s.toLowerCase())
  let match = 0
  career.requiredSkills.forEach(rs=>{ if(skills.includes(rs.toLowerCase())) match++ })
  const total = career.requiredSkills.length
  const percent = Math.round((match/total)*100)
  return { match, total, percent, matchingSkills: career.requiredSkills.filter(rs=>skills.includes(rs.toLowerCase())).map(s=>s), missingSkills: career.requiredSkills.filter(rs=>!skills.includes(rs.toLowerCase())).map(s=>s) }
}

export default function DashboardPage({ careers }){
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [scored, setScored] = useState([])

  useEffect(()=>{
    const p = loadProfile()
    if(!p){ navigate('/profile') ; return }
    setProfile(p)
    const sc = careers.map(c=>({ ...c, ...scoreCareer(c,p) })).sort((a,b)=>b.percent - a.percent)
    setScored(sc)
  }, [])

  if(!profile) return null

  const top = scored.slice(0,3)

  // Data for chart: show overall skills vs missing for top career
  const chartLabels = top.map(t=>t.title)
  const haveData = top.map(t=>t.match)
  const missingData = top.map(t=>t.total - t.match)

  const data = {
    labels: chartLabels,
    datasets: [
      { label: 'Have', data: haveData },
      { label: 'Missing', data: missingData }
    ]
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Hello, {profile.name}</h2>
          <div className="text-sm text-slate-600">Education: {profile.education || '—'}</div>
          <div className="mt-3">
            <div className="text-sm text-slate-600">Interests</div>
            <div className="flex gap-2 flex-wrap mt-2">
              {profile.interests.map((i,idx)=>(<span key={idx} className="px-3 py-1 bg-amber-100 rounded-full text-sm">{i}</span>))}
            </div>
          </div>
          <div className="mt-3">
            <div className="text-sm text-slate-600">Skills</div>
            <div className="flex gap-2 flex-wrap mt-2">
              {profile.skills.map((s,idx)=>(<span key={idx} className="px-3 py-1 bg-slate-100 rounded-full text-sm">{s}</span>))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-md font-semibold mb-2">Top Recommendations</h3>
          <div className="space-y-3">
            {top.map((t,idx)=>(
              <div key={t.id} className="p-3 border rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{t.title}</h4>
                    <div className="text-sm text-slate-600">{t.description}</div>
                  </div>
                  <div className="text-sm text-slate-600">Match: <strong>{t.percent}%</strong></div>
                </div>
                <div className="mt-2">
                  <div className="text-sm text-slate-600">Matching skills</div>
                  <div className="flex gap-2 flex-wrap mt-1">
                    {t.matchingSkills.map((m,i)=>(<span key={i} className="px-2 py-1 bg-green-100 rounded-full text-sm">{m}</span>))}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm text-slate-600">Missing skills</div>
                  <div className="flex gap-2 flex-wrap mt-1">
                    {t.missingSkills.map((m,i)=>(<span key={i} className="px-2 py-1 bg-red-100 rounded-full text-sm">{m}</span>)) || <span className="text-sm text-slate-500">None</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-md font-semibold mb-2">Resources & Next Steps</h3>
          <p className="text-sm text-slate-600">Suggested learning: focus on missing skills from top recommendation.</p>
          <ol className="list-decimal ml-5 mt-2 text-sm space-y-1 text-slate-700">
            <li>Identify the most important missing skill(s) for your top career.</li>
            <li>Find a short course (Coursera / freeCodeCamp / YouTube) to cover basics.</li>
            <li>Build a small project to demonstrate that skill in your portfolio.</li>
          </ol>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Skill Gap Chart</h4>
          <div className="mt-2">
            <Bar data={data} />
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">All Careers (quick view)</h4>
          <div className="mt-2 space-y-2">
            {scored.map(c=>(
              <div key={c.id} className="p-2 border rounded flex justify-between items-center">
                <div>
                  <div className="font-medium">{c.title}</div>
                  <div className="text-sm text-slate-600">Match: {c.percent}%</div>
                </div>
                <div>
                  <button onClick={()=>{ alert('Missing: ' + c.missingSkills.join(', ')) }} className="px-3 py-1 bg-slate-100 rounded">Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <button onClick={()=>navigate('/profile')} className="w-full px-3 py-2 bg-blue-600 text-white rounded mb-2">Edit Profile</button>
          <button onClick={()=>{ if(confirm('Clear profile and go to Profile page?')){ clearProfile(); navigate('/profile') } }} className="w-full px-3 py-2 bg-gray-100 rounded">Clear Profile</button>
        </div>
      </aside>
    </div>
  )
}
