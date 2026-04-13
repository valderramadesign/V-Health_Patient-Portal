import { useState } from "react";
import PatientPortalHome    from "./PatientPortalHome";
import BookAppointmentPage  from "./BookAppointmentPage";
import MessageCareTeamPage  from "./MessageCareTeamPage";
import TestResultsPage      from "./TestResultsPage";
import RequestRefillPage    from "./RequestRefillPage";

/*
  App.jsx — top-level client-side router.

  Pages:
    "home"              → PatientPortalHome
    "book-appointment"  → BookAppointmentPage
    "messages"          → MessageCareTeamPage
    "test-results"      → TestResultsPage
    "refill-request"    → RequestRefillPage

  To add more pages later, extend the `pages` map and add
  corresponding entries to the navigation route maps in each page file.
*/

const pages = {
  "home":             PatientPortalHome,
  "book-appointment": BookAppointmentPage,
  "messages":         MessageCareTeamPage,
  "test-results":     TestResultsPage,
  "refill-request":   RequestRefillPage,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (pageId) => {
    if (!pages[pageId]) return;
    setCurrentPage(pageId);
    // Scroll to top instantly so the new page starts at the top
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const Page = pages[currentPage] ?? PatientPortalHome;

  return <Page onNavigate={navigate} />;
}
