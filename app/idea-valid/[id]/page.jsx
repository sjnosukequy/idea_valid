// `app/page.tsx` is the UI for the `/` URL
'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { AlertTriangle, AlertOctagon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { uniqueNamesGenerator, names } from 'unique-names-generator';




export default function Page() {
    const [point, setPoint] = useState('0')
    const [breif, setBreif] = useState('This is painful to read.')
    const [review, setReview] = useState(`Your business idea faces several limitations, particularly in terms of audience priorities and engagement with the problem you are addressing. The lack of urgency, combined with potential low willingness to pay, presents challenges in convincing users to invest in your product. Moreover, your competition is present and manageable, yet without a clear differentiation strategy, you may struggle to carve out a unique space in the market.`)
    const [Priority, setPriority] = useState(`Your audience doesn't see this problem as a priority. It's not something they constantly think about or deal with on a daily or weekly basis. This lack of urgency can lead to low engagement with your solution, making it hard to gain traction.`)
    const [Budget, setBudget] = useState('Your audience may not be accustomed to paying for a solution to this problem. If they typically expect free solutions or workaround methods, it can create a mental block against purchasing your product. This could hinder your ability to convert interest into sales.')
    const [Consequences, setConsequences] = useState(`Not solving this problem does not have serious negative consequences for your audience. They won't feel any significant fear or pressure to find a solution, which means they might ignore your offering altogether. This affects your chances of convincing users that they need your product.`)
    const [Competition, setCompetition] = useState(`There seems to be moderate competition in this space, but it's not overwhelmingly fierce. While there are existing players, they may not be large brands, which provides some opportunity. However, you'll need a clear strategy to stand out to avoid being overshadowed.`)
    const [Differentiation, setDifferentiation] = useState(`It's tough to identify clear opportunities for differentiation in your idea. Without a strong unique selling proposition, your product risks blending into a crowded marketplace. You need to rethink your offering to highlight what makes it distinctly better or different to attract attention.`)
    const [Marketing, setMarketing] = useState(`Acquiring users in this market might prove challenging. Your target audience may not be easily reachable through standard marketing channels, which can hinder your user acquisition efforts. You'll need to invest time in figuring out the right messages and platforms to connect with them effectively.`)

    const [data, setData] = useState(null)
    async function interact(request, user) {
        let data = await fetch(`https://general-runtime.voiceflow.com/state/user/${encodeURI(user)}/interact`, {
            headers: { Authorization: process.env.NEXT_PUBLIC_API_KEY, 'Content-Type': 'application/json', versionID: 'production' },
            method: "POST",
            body: JSON.stringify({ request })
        })
        return data.json()
    }

    const config = {
        dictionaries: [names]
    }
    const characterName = uniqueNamesGenerator(config)
    const [name] = useState(characterName)


    useEffect(() => {
        async function fetchPosts() {
            const idea = sessionStorage.getItem("idea")
            const audience = sessionStorage.getItem("audience")
            if(idea == '' || audience == '' || idea == null || audience == null){
                setLoaded(true)
                return
            }
            let res = await fetch('../api/gpt/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "idea": idea,
                    "audience": audience,
                    "user": name
                }),
            })
            let data = await res.json()
            setData(data)
        }
           // INIT
        interact({
            type: 'launch'
        }, characterName)
        fetchPosts()
    }, [])

    useEffect(() => {
        setContent()
    }, [data])

    const [loaded, setLoaded] = useState(false)

    function setContent() {
        if (data?.['postRes']?.[1]?.['payload']) {
            setLoaded(true)
            console.log(loaded)
            console.log(data)
            const data2 = JSON.parse(data['postRes'][1]['payload']['message'])
            setPoint(data2['score'])
            setBreif(data2['breif'])
            setReview(data2['review'])
            setPriority(data2['Priority'])
            setBudget(data2['Budget'])
            setConsequences(data2['Consequences'])
            setCompetition(data2['Competition'])
            setDifferentiation(data2['Differentiation'])
            setMarketing(data2['Marketing'])
        }
    }


    return (
        <div className="max-w-4xl mx-auto p-6 rounded-lg">
            {
                !loaded ? <div className='relative flex flex-col justify-center content-center h-[90vh]'>
                    <span className="absolute loading loading-spinner loading-lg top-[40%] left-[47%]"></span>
                    <span className='text-xl text-center'>Generating...</span>
                </div> : <div>
                    <header className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Your audit is ready 🎉</h1>
                        <div className="flex gap-2 flex-col md:flex-row">
                            <a href='../'>
                                <Button className="px-4 py-2 border border-blue-500 text-blue-500 bg-transparent hover:bg-slate-100 rounded-md">
                                    Restart
                                </Button>
                            </a>
                            <Button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Share link</Button>
                        </div>
                    </header>

                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                        <div className="flex items-center mb-2">
                            <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center text-xl font-bold">
                                {point}
                            </div>
                            <h2 className="ml-4 text-xl font-semibold">{breif}</h2>
                        </div>
                        <p className="text-sm text-gray-600">
                            {review}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {[
                            { title: 'Priority', icon: AlertOctagon, color: 'text-red-500', content: Priority },
                            { title: 'Budget', icon: AlertTriangle, color: 'text-yellow-500', content: Budget },
                            { title: 'Consequences', icon: AlertOctagon, color: 'text-red-500', content: Consequences },
                            { title: 'Competition', icon: AlertTriangle, color: 'text-yellow-500', content: Competition },
                            { title: 'Differentiation', icon: AlertOctagon, color: 'text-red-500', content: Differentiation },
                            { title: 'Marketing', icon: AlertTriangle, color: 'text-yellow-500', content: Marketing },
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow">
                                <div className="flex items-center mb-2">
                                    <item.icon className={`${item.color} mr-2`} />
                                    <h3 className="font-semibold">{item.title}</h3>
                                </div>
                                <p className="text-sm text-gray-600">{item.content}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-orange-100 p-4 rounded-lg mb-6">
                        <h2 className="text-lg font-semibold mb-2">Turn your idea into a profitable business</h2>
                        <p className="mb-4">Gain clarity with 9 actionable marketing ideas. Acquire more users, nurture them with content, and enjoy new sales.</p>
                        <div className="flex">
                            <input type="email" placeholder="Your email" className="flex-grow px-4 py-2 rounded-l-md border-t border-b border-l" />
                            <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-r-md">Unlock for FREE</button>
                        </div>
                    </div>

                    {['User Acquisition Ideas', 'Content Marketing Ideas', 'Conversion Rate Optimization Ideas'].map((section, index) => (
                        <div key={index} className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">{`3 ${section}`}</h2>
                            <p className="text-sm text-gray-600 mb-2">
                                {index === 0 && "Get high-quality traffic that wants to buy your product"}
                                {index === 1 && "Nurture your audience with helpful content"}
                                {index === 2 && "Convert interested visitors into happy customers"}
                            </p>
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="bg-gray-100 p-2 rounded mb-2">
                                    <p className="text-sm text-gray-500">Idea details would go here...</p>
                                </div>
                            ))}
                        </div>
                    ))}

                    <Button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Explore more free tools</Button>

                    <footer className="mt-6 text-center text-sm text-gray-500">
                        <a href="#" className="mr-4">Privacy Policy</a>
                        <a href="#" className="mr-4">Terms of Service</a>
                        <a href="#">QuyVuong@founderat.ai</a>
                    </footer>
                </div>
            }
        </div>
    );
}