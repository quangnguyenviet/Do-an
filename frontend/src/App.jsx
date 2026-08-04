import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppShell from "./components/layout/AppShell";
import LoginPage from "./pages/LoginPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import TutorManagement from "./pages/admin/TutorManagement";
import TutorDashboard from "./pages/tutor/TutorDashboard";
import StudentsList from "./pages/tutor/StudentsList";
import StudentDetail from "./pages/tutor/StudentDetail";
import ManageOverview from "./pages/tutor/manage/ManageOverview";
import ManageLearningPathRoute from "./pages/tutor/manage/ManageLearningPathRoute";
import ManageAssignmentsRoute from "./pages/tutor/manage/ManageAssignmentsRoute";
import AddAssignmentPage from "./pages/tutor/manage/AddAssignmentPage";
import ManageMaterialsRoute from "./pages/tutor/manage/ManageMaterialsRoute";
import TutorExerciseDetail from "./pages/tutor/TutorExerciseDetail";
import ExerciseGenerator from "./pages/tutor/ExerciseGenerator";
import GradingQueue from "./pages/tutor/GradingQueue";
import ParentInbox from "./pages/tutor/ParentInbox";
import Notifications from "./pages/tutor/Notifications";
import LibraryPaths from "./pages/tutor/LibraryPaths";
import LibraryPathDetail from "./pages/tutor/LibraryPathDetail";
import LibraryExercises from "./pages/tutor/LibraryExercises";
import LibraryMaterials from "./pages/tutor/LibraryMaterials";
import TutorProfile from "./pages/tutor/TutorProfile";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentSchedule from "./pages/student/StudentSchedule";
import StudentExercises from "./pages/student/StudentExercises";
import ExerciseTaking from "./pages/student/ExerciseTaking";
import StudentProgress from "./pages/student/StudentProgress";
import StudentMaterials from "./pages/student/StudentMaterials";
import SettingsPage from "./pages/SettingsPage";

function RequireRole({ role, children }) {
  const { session } = useAuth();
  if (!session) return <Navigate to="/login" replace />;
  if (session.role !== role) return <Navigate to={`/${session.role}`} replace />;
  return children;
}

function RootRedirect() {
  const { session } = useAuth();
  if (!session) return <Navigate to="/login" replace />;
  return <Navigate to={`/${session.role}`} replace />;
}

function StudentDetailDefaultTab() {
  const { studentId } = useParams();
  return <Navigate to={`/tutor/students/${studentId}/path`} replace />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RootRedirect />} />

        <Route
          path="/admin"
          element={
            <RequireRole role="admin">
              <AppShell />
            </RequireRole>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="tutors" element={<TutorManagement />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route
          path="/tutor"
          element={
            <RequireRole role="tutor">
              <AppShell />
            </RequireRole>
          }
        >
          <Route index element={<TutorDashboard />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="students/:studentId" element={<StudentDetailDefaultTab />} />
          <Route path="students/:studentId/overview" element={<StudentDetail />}>
            <Route index element={<ManageOverview />} />
          </Route>
          <Route path="students/:studentId/path" element={<StudentDetail />}>
            <Route index element={<ManageLearningPathRoute />} />
          </Route>
          <Route path="students/:studentId/exercises" element={<StudentDetail />}>
            <Route index element={<ManageAssignmentsRoute />} />
            <Route path="add" element={<AddAssignmentPage />} />
          </Route>
          <Route path="students/:studentId/materials" element={<StudentDetail />}>
            <Route index element={<ManageMaterialsRoute />} />
          </Route>
          <Route path="students/:studentId/exercises/:exerciseId" element={<TutorExerciseDetail />} />
          <Route path="exercise-generator" element={<ExerciseGenerator />} />
          <Route path="grading" element={<GradingQueue />} />
          <Route path="inbox" element={<ParentInbox />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="library/paths" element={<LibraryPaths />} />
          <Route path="library/paths/:templateId" element={<LibraryPathDetail />} />
          <Route path="library/exercises" element={<LibraryExercises />} />
          <Route path="library/materials" element={<LibraryMaterials />} />
          <Route path="profile" element={<TutorProfile />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route
          path="/student"
          element={
            <RequireRole role="student">
              <AppShell />
            </RequireRole>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="schedule" element={<StudentSchedule />} />
          <Route path="exercises" element={<StudentExercises />} />
          <Route path="exercises/:exerciseId" element={<ExerciseTaking />} />
          <Route path="progress" element={<StudentProgress />} />
          <Route path="materials" element={<StudentMaterials />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
