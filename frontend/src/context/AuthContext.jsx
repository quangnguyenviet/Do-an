import { createContext, useContext, useEffect, useState } from "react";
import { tutor, students } from "../data/mockData";

const AuthContext = createContext(null);
const STORAGE_KEY = "gsa_session";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  }, [session]);

  function loginAsTutor() {
    setSession({ role: "tutor", name: tutor.name, initials: tutor.initials });
  }

  function loginAsStudent(studentId) {
    const s = students.find((x) => x.id === studentId);
    if (!s) return;
    setSession({ role: "student", studentId: s.id, name: s.name, initials: s.initials });
  }

  function logout() {
    setSession(null);
  }

  return (
    <AuthContext.Provider value={{ session, loginAsTutor, loginAsStudent, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
