import React from "react";
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";

const sections = [
  {
    leftLabel: "Silence",
    title: <>Absence</>,
    rightLabel: "Silence",
    background:
      "https://images.pexels.com/photos/3289156/pexels-photo-3289156.jpeg?cs=srgb&dl=pexels-alexfu-3289156.jpg&fm=jpg&_gl=1*1acr8i7*_ga*MTI3MjA2NDU0Mi4xNzU1NzM3ODI5*_ga_8JE65Q40S6*czE3NTU3NjkyMzgkbzMkZzEkdDE3NTU3Njk1MTckajYwJGwwJGgw",
    audioSrc: "/sfx/click-01.mp3",
  },
  {
    leftLabel: "Essence",
    title: <>Stillness</>,
    rightLabel: "Essence",
    background: "https://images.pexels.com/photos/163790/at-night-under-a-lantern-guy-night-city-163790.jpeg",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
  {
    leftLabel: "Rebirth",
    title: <>Growth</>,
    rightLabel: "Rebirth",
    background: "https://images.pexels.com/photos/9817/pexels-photo-9817.jpeg",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
  {
    leftLabel: "Change",
    title: <>Opportunity</>,
    rightLabel: "Change",
    background: "https://images.pexels.com/photos/939807/pexels-photo-939807.jpeg",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
];

export default function DemoOne() {
  const apiRef = React.useRef<FullScreenFXAPI>(null);

  return (
    <>
      <FullScreenScrollFX
        sections={sections}
        header={
          <>
            <div>The Creative</div>
            <div>Process</div>
          </>
        }
        footer={<div></div>}
        showProgress
        durations={{ change: 0.7, snap: 800 }}
      />
    </>
  );
}
