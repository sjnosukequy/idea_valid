'use client'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import styles from './styles.module.css'
import CustomCard from "@/components/ui/CustomCard";

export default function Home() {
  const [review] = useState([
    [
      "So close yet so far from greatness.",
      "Post-purchase platform for Creators",
      "62"
    ],
    [
      "Zero points for effort.",
      "Directory of SaaS boilerplates",
      "44"
    ],
    [
      "Not good, not terrible.",
      "Unlimited design agency",
      "65"
    ],
    [
      "Could be worse, but not by much.",
      "Movie recommendation platform",
      "53"
    ],
    [
      "Not even close, buddy.",
      "Mood tracker for pets",
      "32"
    ],
    [
      "Are you allergic to good ideas?",
      "AI-generated music playlists",
      "48"
    ],
    [
      "A lukewarm attempt at creativity.",
      "Minimalistic to-do app",
      "50"
    ],
    [
      "Respect yourself, please.",
      "Screenshot tool for Twitter",
      "43"
    ],
    [
      "Top stuff, keep it coming.",
      "AI-powered keyword research",
      "82"
    ],
    [
      "Rocking it with that idea.",
      "Marketing Strategy Generator",
      "91"
    ]
  ]);

  useEffect(() => {
    const sliderList = document.querySelectorAll<HTMLElement>("#slider li")
    if (sliderList) {
      const lineHeight = sliderList[0].offsetHeight + 30;
      const slider = document.querySelector<HTMLElement>("#slider");
      if (slider) {
        slider.style.height = lineHeight * sliderList.length + "px";
        const sliderRect = slider.getBoundingClientRect();
        const totalHeight = sliderRect.height;
        const time = (totalHeight) / 100; // 500px / sec
        slider.style.animationDuration = time + "s";
      }
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-[100vw] h-[100vh]">
      <div className="flex flex-col flex-wrap justify-center content-center w-full md:w-[50%] lg:w-[60%] p-5 gap-5">
        <h1 className="text-5xl lg:text-7xl font-black">
          <p className="text-[#FF612D]">100% FREE</p>
          IDEA VALIDATOR</h1>
        <p className="text-2xl">Get honest feedback about your business idea. Build something people want.</p>
        <div className="flex flex-col gap-7 w-full lg:w-[70%] mt-3">
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-md font-bold" htmlFor="idea">Your business idea*</Label>
            <Input className="text-md p-5" type="text" id="idea" placeholder="AI-powered fitness plan generator" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-md font-bold" htmlFor="audience">Your audience*</Label>
            <Input className="text-md p-5" type="text" id="audience" placeholder="Young parents" />
          </div>
          <div className="w-full mt-7">
            <a href="./idea-valid">
              <Button className="bg-[#FF612D] py-7 w-full text-white text-xl font-black">Validate my idea for FREE →</Button>
            </a>
            <p className="mt-2">22,323 business ideas validated already</p>
          </div>
        </div>
      </div>
      <div className="relative w-full md:w-[50%] lg:w-[40%] h-full bg-[#ffc0ab] overflow-hidden box-border hidden md:block">
        <ul id='slider' className={styles.slider}>
          {review.map((reviewData, index) => (
            <li key={index}>
              <CustomCard review={reviewData[0]} prod={reviewData[1]} num={parseInt(reviewData[2])} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
