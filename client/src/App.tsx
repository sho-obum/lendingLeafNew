import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomeLoan from "@/pages/HomeLoan";
import LandingPage from "@/pages/LandingPage";
import Navbar from "../src/components/Navbar";  // Import Navbar component

function Router() {
  return (
    <>
      <Navbar />  {/* Navbar stays on top */}
      <Switch>
        <Route path="/homeloan" component={HomeLoan} />
        <Route path="/" component={LandingPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
