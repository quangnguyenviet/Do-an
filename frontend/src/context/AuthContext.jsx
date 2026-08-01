import { createContext, useContext, useEffect, useState } from "react";
import { tutors, tutor, students } from "../data/mockData";

const AuthContext = createContext(null);
const STORAGE_KEY = "gsa_session";
const ADMIN_ACCOUNT = { name: "Quản trị hệ thống", initials: "QT", email: "admin@englishpath.vn" };

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // State quản lý danh sách gia sư — dùng cho module admin
  const [tutorList, setTutorList] = useState(() => [...tutors]);

  useEffect(() => {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  }, [session]);

  function loginAsAdmin() {
    setSession({ role: "admin", name: ADMIN_ACCOUNT.name, initials: ADMIN_ACCOUNT.initials, email: ADMIN_ACCOUNT.email });
  }

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

  // Admin CRUD helpers for tutors
  function addTutor(newTutor) {
    const id = `t-${Date.now()}`;
    setTutorList((prev) => [{ ...newTutor, id }, ...prev]);
  }

  function updateTutor(id, patch) {
    setTutorList((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  function removeTutor(id) {
    setTutorList((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        loginAsAdmin,
        loginAsTutor,
        loginAsStudent,
        logout,
        tutorList,
        setTutorList,
        addTutor,
        updateTutor,
        removeTutor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
