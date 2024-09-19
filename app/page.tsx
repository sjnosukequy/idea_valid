'use client'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { Rocket, Users, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"


export default function Home() {
  const router = useRouter()

  const [idea, setIdea] = useState('');
  const [audience, setAudience] = useState('');
  const { toast } = useToast()

  const [loaded, setLoaded] = useState(false)

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
    setLoaded(true)
    sessionStorage.setItem("idea", idea.toLowerCase());
    sessionStorage.setItem("audience", audience.toLowerCase());
    const array = new Uint32Array(3);
    self.crypto.getRandomValues(array);
    const number = (array[0] + array[1] + array[2]).toString();
    try {
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
      setLoaded(false)
    }
    catch (e) {
      setLoaded(false)
    }
  }

  return (
    <div className="relative flex flex-col md:flex-row w-[100vw] h-[100vh] bg-[#F8FAFC]">
      <div className="relative flex flex-col flex-wrap justify-center content-center w-full p-5 gap-5">
        <div className="z-[2]">
          <h1 className="mb-3 text-5xl md:text-6xl font-mono text-[#111827]">
            100% FREE IDEA VALIDATOR
          </h1>
          <p className="text-xl md:text-lg mb-7 font-mono text-[#111827] text-left md:text-center">Get honest feedback about your business idea. Build something people want.</p>
          <div className="flex flex-col gap-7 justify-center content-center flex-wrap mt-3">
            <form onSubmit={handleIdeaSubmit} className="space-y-8 w-full lg:w-[70%]">
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
                <Button disabled={loaded} type="submit" className="w-full py-7 text-xl bg-[#61BFAD] hover:bg-[#61BFAD] text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                  Validate my idea for FREE <ArrowRight className="inline-block ml-2" size={24} /> </Button>
                <p className="mt-2 text-[#111827] italic font-mono">22,323 business ideas validated already</p>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
