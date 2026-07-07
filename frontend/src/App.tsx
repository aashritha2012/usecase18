import { Route, Routes } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import Dashboard from "@/pages/Dashboard";
import Questions from "@/pages/Questions";
import Evidence from "@/pages/Evidence";
import Impact from "@/pages/Impact";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/evidence" element={<Evidence />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
