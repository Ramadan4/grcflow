import { Toaster } from "@/components/ui/toaster";
import TableExample from "./pages/TableExample";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import TestProcedureDetails from "./pages/TestProcedureDetails";
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";
import Delegation from "./pages/Delegation";
import CreateDelegation from "./pages/CreateDelegation";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/test-procedure" element={<TestProcedureDetails />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/users/create" element={<CreateUser />} />
                  <Route path="/delegation" element={<Delegation />} />
                  <Route path="/delegation/create" element={<CreateDelegation />} />
                  <Route path="/table-example" element={<TableExample />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
