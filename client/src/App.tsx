import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../src/components/ui/toaster.jsx";
import NotFound from "../src/pages/not-found.jsx";
import HomeLoan from "../src/pages/HomeLoan.jsx";
import LandingPage from "../src/pages/LandingPage.jsx";
import Navbar from "../src/components/Navbar.jsx";  // Import Navbar component

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
