import EventsPage from "@/blogscomponents/EventsComponent";
import React from "react";

export const metadata = {
  title:
    "GenAI Health – Workshops, Webinars & AI in Healthcare Conferences",
  description:
    "Stay updated with GenAI Health events: webinars, workshops, and conferences on AI-driven healthcare innovation and insights.",
};

function Events() {
  return (
    <>
      <link rel="canonical" href="https://www.genaihealth.care/events"/>
      <EventsPage />
    </>
  );
}

export default Events;
