"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import DualEntry from "@/components/DualEntry";
import Creative from "@/components/Creative";
import CaseStudies from "@/components/CaseStudies";
import Thinking from "@/components/Thinking";
import Experience from "@/components/Experience";
import Tools from "@/components/Tools";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Navigation />
      <main>
        <Hero onOpenModal={() => setModalOpen(true)} />
        <div className="section-divider" />
        <DualEntry />
        <div className="section-divider" />
        <Creative />
        <div className="section-divider" />
        <CaseStudies />
        <div className="section-divider" />
        <Thinking />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Tools />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer onOpenModal={() => setModalOpen(true)} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
