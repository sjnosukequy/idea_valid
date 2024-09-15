'use client'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import styles from './styles.module.css'
import CustomCard from "@/components/ui/CustomCard";
import { useRouter } from 'next/navigation'
import { Rocket, Users, ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast"

// const BackgroundPattern = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="400 20 200 600" className="blur-md absolute left-0 h-full w-full text-[#22C55E] opacity-[80%] z-[0] pointer-events-none">
//     <defs>
//       <pattern id="smallGrid" width="50" height="50" patternUnits="userSpaceOnUse">
//         <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
//       </pattern>
//       {/* <pattern id="circles" width="100" height="100" patternUnits="userSpaceOnUse">
//         <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
//       </pattern> */}
//     </defs>

//     <rect width="100%" height="100%" fill="url(#smallGrid)" />
//     <rect width="100%" height="100%" fill="url(#circles)" />

//     <path d="M100,100 L300,150 L500,100 L700,150 L900,100" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
//     <path d="M100,300 Q300,150 500,300 T900,300" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />

//     <circle cx="200" cy="400" r="20" fill="currentColor" opacity="0.6" />
//     <circle cx="400" cy="600" r="20" fill="currentColor" opacity="0.6" />
//     <circle cx="600" cy="400" r="20" fill="currentColor" opacity="0.6" />
//     <circle cx="800" cy="600" r="20" fill="currentColor" opacity="0.6" />

//     <line x1="200" y1="400" x2="400" y2="600" stroke="currentColor" strokeWidth="2" opacity="0.4" />
//     <line x1="400" y1="600" x2="600" y2="400" stroke="currentColor" strokeWidth="2" opacity="0.4" />
//     <line x1="600" y1="400" x2="800" y2="600" stroke="currentColor" strokeWidth="2" opacity="0.4" />
//     {/* <path d="M400,200 L600,200 L650,400 L500,550 L350,400 Z" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.8" />
//     <path d="M0,800 Q250,700 500,800 T1000,800" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
//     <path d="M0,850 Q250,950 500,850 T1000,850" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" /> */}
//   </svg>
// );

// const BackgroundPattern2 = () => (
//   <svg className="absolute hidden md:block md:top-1/4 lg:top-8 right-1/4 lg:m-0 z-[1] text-[#22C55E] opacity-[20%]" width="404" height="392" fill="none" viewBox="0 0 404 392">
//     <defs>
//       <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
//         <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
//       </pattern>
//     </defs>
//     <rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"></rect>
//   </svg>
// );

const Marquee = ({ children, direction = 'left', index = 0 }: { children: ReactNode, direction: string, index: number }) => {
  const [speed, setSpeed] = useState(0)

  useEffect(() => {
    // const totalLength = document.querySelector('.animate-marquee')
    const sliderList = document.querySelectorAll<HTMLElement>(".slider")
    const sliderWidth = sliderList[index].getBoundingClientRect().width || 0
    setSpeed(sliderWidth / 75)
    // console.log(index, sliderWidth, sliderList[index])
  }, []);

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className={`slider inline-block ${styles['animate-marquee']}`}
        style={{
          animationDirection: `${direction}` === 'left' ? 'normal' : 'reverse',
          animationDuration: `${speed}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter()
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
    ],
    [
      "Mediocrity in motion.",
      "Virtual cooking classes for kids",
      "40"
    ],
    [
      "Slightly better than nothing.",
      "Personalized skincare routine app",
      "47"
    ],
    [
      "A swing and a miss.",
      "Smart home energy tracker",
      "38"
    ],
    [
      "You're not even trying, are you?",
      "Customized podcast playlist generator",
      "29"
    ],
    [
      "Almost impressive, but not quite.",
      "AI-powered book recommendation engine",
      "61"
    ],
    [
      "It has potential, but needs work.",
      "Eco-friendly packaging subscription service",
      "58"
    ],
    [
      "Innovative, but execution lacks finesse.",
      "Collaborative task manager for remote teams",
      "67"
    ],
    [
      "The idea is there, but the magic is missing.",
      "Voice-controlled meditation guide",
      "55"
    ],
    [
      "This could change the game, eventually.",
      "Automated video editing for influencers",
      "78"
    ],
    [
      "Way to go! You've nailed it.",
      "AI-driven social media content planner",
      "87"
    ],
    [
      "Almost a masterpiece.",
      "Interactive fitness app with live coaches",
      "74"
    ],
    [
      "This one’s a hidden gem.",
      "VR travel experiences on demand",
      "81"
    ],
    [
      "Your creativity is showing.",
      "AI-enhanced coding assistant",
      "90"
    ],
    [
      "Bold move, but it needs polish.",
      "Subscription box for indie films",
      "54"
    ],
    [
      "A solid effort with room to grow.",
      "Smart calendar with automatic scheduling",
      "66"
    ],
    [
      "Not bad, but don't get too excited.",
      "Personalized nutrition tracker",
      "57"
    ],
    [
      "This could work, in another timeline.",
      "AR shopping app for home decor",
      "42"
    ],
    [
      "Are you sure this is finished?",
      "AI-powered email response generator",
      "36"
    ],
    [
      "An idea worth refining.",
      "B2B influencer marketplace",
      "64"
    ],
    [
      "This might actually be something.",
      "Automatic blog content writer",
      "72"
    ]
  ]);

  const [idea, setIdea] = useState('');
  const [audience, setAudience] = useState('');
  const { toast } = useToast()

  // useEffect(() => {
  //   const sliderList = document.querySelectorAll<HTMLElement>("#slider li")
  //   if (sliderList) {
  //     const lineHeight = sliderList[0].offsetHeight + 30;
  //     const slider = document.querySelector<HTMLElement>("#slider");
  //     if (slider) {
  //       slider.style.height = lineHeight * sliderList.length + "px";
  //       const sliderRect = slider.getBoundingClientRect();
  //       const totalHeight = sliderRect.height;
  //       const time = (totalHeight) / 100; // 500px / sec
  //       slider.style.animationDuration = time + "s";
  //     }
  //   }
  // }, []);

  async function handleIdeaSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!idea || !audience) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Pleas fill out all the fields.",
      })
      return;
    }
    sessionStorage.setItem("idea", idea.toLowerCase());
    sessionStorage.setItem("audience", audience.toLowerCase());
    const array = new Uint32Array(3);
    self.crypto.getRandomValues(array);
    const number = (array[0] + array[1] + array[2]).toString();
    const response = await fetch('/api/set-db1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: number.toLowerCase(),
        idea: idea.toLowerCase(),
        audience: audience.toLowerCase()
      }),
    })
    if (response.status == 200)
      router.push(`/idea-valid/${number}`)
    if (response.status == 201) {
      response.json().then((data) => {
        router.push(`/idea-valid/${data['Data']['rows'][0]['id']}`)
        // console.log(data)
      })
    }
  }

  const chunkArray = (arr: Array<Array<string>>, size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };
  
  const reviewChunks = chunkArray(review, Math.ceil(review.length / 3));

  return (
    <div className="relative flex flex-col md:flex-row w-[100vw] h-[100vh] bg-[#F8FAFC]">
      <div className="relative flex flex-col flex-wrap justify-center content-center w-full md:w-[50%] lg:w-[55%] p-5 gap-5">
        {/* <BackgroundPattern /> */}
        {/* <div className="absolute w-full h-full left-0 bg-current invert opacity-10 z-[1] pointer-events-none"></div> */}
        <div className="z-[2]">
          {/* <h1 className="mb-3 text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
            100% FREE IDEA VALIDATOR
          </h1> */}
          <h1 className="mb-3 text-5xl md:text-6xl font-mono text-[#111827]">
            100% FREE IDEA VALIDATOR
          </h1>
          <p className="text-2xl mb-7 font-mono text-[#111827]">Get honest feedback about your business idea. Build something people want.</p>
          <div className="flex flex-col gap-7 w-full lg:w-[70%] mt-3">
            <form onSubmit={handleIdeaSubmit} className="space-y-8">
              <div className="grid w-full items-center gap-1.5 text-[#111827]">
                <Label className="text-md font-bold" htmlFor="idea">
                  <Rocket className="inline-block mr-2 text-[#61BFAD]" size={20} />
                  Your business idea <span className="text-[#61BFAD]">*</span>
                </Label>
                <Input value={idea} onChange={(e) => setIdea(e.target.value)} className="text-black backdrop-blur-lg text-md p-5" type="text" id="idea" name="idea" placeholder="AI-powered fitness plan generator" />
              </div>
              <div className="grid w-full items-center gap-1.5 text-[#111827]">
                <Label className="text-md font-bold" htmlFor="audience">
                  <Users className="inline-block mr-2 text-[#61BFAD]" size={20} />
                  Your audience <span className="text-[#61BFAD]">*</span>
                </Label>
                <Input value={audience} onChange={(e) => setAudience(e.target.value)} className="text-black backdrop-blur-lg text-md p-5" type="text" id="audience" name="audience" placeholder="Young parents" />
              </div>

              <div className="w-full mt-7">
                {/* <Button type="submit" className="w-full py-7 text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                  Validate my idea for FREE <ArrowRight className="inline-block ml-2" size={24} /> </Button> */}
                <Button type="submit" className="w-full py-7 text-xl bg-[#61BFAD] hover:bg-[#61BFAD] text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                  Validate my idea for FREE <ArrowRight className="inline-block ml-2" size={24} /> </Button>
                <p className="mt-2 text-[#111827] italic font-mono">22,323 business ideas validated already</p>
              </div>

            </form>

          </div>
        </div>
      </div>
      {/* <BackgroundPattern2 /> */}
      <div className="relative w-full md:w-[50%] bg-transparent ps-5 lg:w-[45%] h-full overflow-hidden box-border hidden md:block">

        {/* <ul id='slider' className={styles.slider}>
          {review.map((reviewData, index) => (
            <li key={index}>
              <CustomCard review={reviewData[0]} prod={reviewData[1]} num={parseInt(reviewData[2])} />
            </li>
          ))}
        </ul> */}
        <div className="absolute h-full flex flex-col justify-center space-y-3 z-[2]">
          {reviewChunks.map((chunk, index) => {
            // console.log(index)
            return (
              <Marquee key={index} direction={index % 2 === 0 ? 'left' : 'right'} index={index}>
                <div className="flex space-x-4">
                  {chunk.map((reviewData, cardIndex) => (
                    <div key={cardIndex}>
                      <CustomCard review={reviewData[0]} prod={reviewData[1]} num={parseInt(reviewData[2])} />
                    </div>
                  ))}
                </div>
              </Marquee>
            )
          })}
        </div>
      </div>
    </div>
  );
}
