import React from "react";
import { FullScreenScrollFX } from "@/components/ui/full-screen-scroll-fx";

const sections = [
  {
    leftLabel: "Tech Summit",
    title: "Tech Summit 2024",
    rightLabel: "Tech Summit",
    background:
      "https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    leftLabel: "Luxury Brand",
    title: "Luxury Brand Gala",
    rightLabel: "Luxury Brand",
    background:
      "https://images.pexels.com/photos/34362959/pexels-photo-34362959.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    leftLabel: "Innovate Co.",
    title: "Product Launch Spectacular",
    rightLabel: "Innovate Co.",
    background:
      "https://images.pexels.com/photos/14999408/pexels-photo-14999408.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    leftLabel: "Industry Assoc.",
    title: "Annual Awards Night",
    rightLabel: "Industry Assoc.",
    background:
      "https://images.pexels.com/photos/19793934/pexels-photo-19793934.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    leftLabel: "Global Corp.",
    title: "Corporate Retreat",
    rightLabel: "Global Corp.",
    background:
      "https://images.pexels.com/photos/7108958/pexels-photo-7108958.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    leftLabel: "Charity Org.",
    title: "Charity Fundraiser",
    rightLabel: "Charity Org.",
    background:
      "https://images.pexels.com/photos/6994994/pexels-photo-6994994.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export default function PortfolioIntro() {
  return (
    <section id="portfolio-intro" className="mt-24">
      <FullScreenScrollFX
        sections={sections}
        header={
          <>
            <div>Our Portfolio</div>
            <div
              style={{ fontSize: 18, fontWeight: 400, textTransform: "none" }}
            >
              
            </div>
          </>
        }
        footer={<div />}
        showProgress
        durations={{ change: 0.7, snap: 800 }}
      />
    </section>
  );
}
