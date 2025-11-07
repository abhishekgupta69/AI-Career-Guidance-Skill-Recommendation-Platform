export const STORAGE_KEY = 'ai_career_profile_enhanced_v1'

export function saveProfile(profile){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
}

export function loadProfile(){
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : null
}

export function clearProfile(){
  localStorage.removeItem(STORAGE_KEY)
}
