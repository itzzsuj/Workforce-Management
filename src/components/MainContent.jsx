
import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Achievements from "./Achievements";
import TrustedClients from "./TrustedClients";
import Locations from "./Locations";
import AboutUs from "./AboutUs";
import ClientTestimonial from "./ClientTestimonial";
import ContactForm from "./ContactForm";
import Footer from "./Footer";

function MainContent() {
  return (
    <main className="flex flex-col rounded-none">
      <Header />
      <Hero />
      <Achievements/>
      <TrustedClients />
      <Locations />
      <AboutUs />
      <ClientTestimonial />
      <ContactForm />
      <Footer />
    </main>
  );
}

export default MainContent;
