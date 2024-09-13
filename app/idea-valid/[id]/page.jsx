// `app/page.tsx` is the UI for the `/` URL
'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { AlertTriangle, AlertOctagon, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from 'next/navigation'



export default function Page({ params }) {
    // console.log(params.id)
    const router = useRouter()
    const [point, setPoint] = useState('0')
    const [brief, setBrief] = useState('This is painful to read.')
    const [review, setReview] = useState(`Your business idea faces several limitations, particularly in terms of audience priorities and engagement with the problem you are addressing. The lack of urgency, combined with potential low willingness to pay, presents challenges in convincing users to invest in your product. Moreover, your competition is present and manageable, yet without a clear differentiation strategy, you may struggle to carve out a unique space in the market.`)
    const [Priority, setPriority] = useState(['Bad', `Your audience doesn't see this problem as a priority. It's not something they constantly think about or deal with on a daily or weekly basis. This lack of urgency can lead to low engagement with your solution, making it hard to gain traction.`])
    const [Budget, setBudget] = useState(['Bad', 'Your audience may not be accustomed to paying for a solution to this problem. If they typically expect free solutions or workaround methods, it can create a mental block against purchasing your product. This could hinder your ability to convert interest into sales.'])
    const [Consequences, setConsequences] = useState(['Normal', `Not solving this problem does not have serious negative consequences for your audience. They won't feel any significant fear or pressure to find a solution, which means they might ignore your offering altogether. This affects your chances of convincing users that they need your product.`])
    const [Competition, setCompetition] = useState(['Normal', `There seems to be moderate competition in this space, but it's not overwhelmingly fierce. While there are existing players, they may not be large brands, which provides some opportunity. However, you'll need a clear strategy to stand out to avoid being overshadowed.`])
    const [Differentiation, setDifferentiation] = useState(['Bad', `It's tough to identify clear opportunities for differentiation in your idea. Without a strong unique selling proposition, your product risks blending into a crowded marketplace. You need to rethink your offering to highlight what makes it distinctly better or different to attract attention.`])
    const [Marketing, setMarketing] = useState(['Bad', `Acquiring users in this market might prove challenging. Your target audience may not be easily reachable through standard marketing channels, which can hinder your user acquisition efforts. You'll need to invest time in figuring out the right messages and platforms to connect with them effectively.`])
    const [data, setData] = useState(null)
    let count = 0

    useEffect(() => {
        const idea = sessionStorage.getItem("idea")
        const audience = sessionStorage.getItem("audience")
        async function gpt() {
            count += 1
            // console.log('called api')
            try {
                const data = await fetch("/api/gpt", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        idea: idea,
                        audience: audience,
                    })
                });
                const response_ai = await data.json()
                const obj = response_ai['response']
                // console.log('in')
                // console.log(obj)
                let data2 = obj['Data']
                if (obj['Type'] != 'json')
                    data2 = JSON.parse(data2)
                const response = await fetch('/api/set-db2', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: params.id,
                        idea: idea,
                        audience: audience,
                        point: data2['score'],
                        brief: data2['brief'],
                        review: data2['review'],
                        priority: data2['Priority'][1],
                        priority_status: data2['Priority'][0],
                        budget: data2['Budget'][1],
                        budget_status: data2['Budget'][0],
                        consequence: data2['Consequences'][1],
                        consequence_status: data2['Consequences'][0],
                        competition: data2['Competition'][1],
                        competition_status: data2['Competition'][0],
                        differ: data2['Differentiation'][1],
                        differ_status: data2['Differentiation'][0],
                        marketing: data2['Marketing'][1],
                        marketing_status: data2['Marketing'][0]
                    }),
                })
                if (response.status == 200)
                    setData(data2)
            }
            catch (err) {
                // console.log(err)
                setLoaded(true)
            }
        }

        async function getData() {
            const response = await fetch('/api/get-db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: params.id
                }),
            })
            const obj = await response.json()
            return obj
        }


        const loadData = getData()
        loadData.then((data) => {
            if (!data['Data']['id']) {
                // setLoaded(true)
                router.push('/')
                return
                // if (!idea || !audience) {
                //     setLoaded(true)
                //     return
                // }
            }
            if (!data['Data']['point'] && !data['Data']['brief'] && !data['Data']['review'] && !data['Data']['priority_status'] && !data['Data']['budget_status'] && !data['Data']['consequence_status'] && !data['Data']['competition_status'] && !data['Data']['differ_status'] && !data['Data']['marketing_status']) {
                // console.log('empty')
                // console.log(data)
                if (count == 0)
                    gpt()
                return
            }
            else {
                let obj = {}
                obj['score'] = data['Data']['point']
                obj['brief'] = data['Data']['brief']
                obj['review'] = data['Data']['review']
                obj['Priority'] = [data['Data']['priority_status'], data['Data']['priority']]
                obj['Budget'] = [data['Data']['budget_status'], data['Data']['budget']]
                obj['Consequences'] = [data['Data']['consequence_status'], data['Data']['consequence']]
                obj['Competition'] = [data['Data']['competition_status'], data['Data']['competition']]
                obj['Differentiation'] = [data['Data']['differ_status'], data['Data']['differ']]
                obj['Marketing'] = [data['Data']['marketing_status'], data['Data']['marketing']]
                // stringify = JSON.stringify(stringify)
                setData(obj)
                return
            }
        })
    }, [])

    useEffect(() => {
        // console.log(data);
        setContent()
    }, [data])

    const [loaded, setLoaded] = useState(false)

    function setContent() {
        if (data) {
            setLoaded(true)
            try {
                setPoint(data['score'])
                setBrief(data['brief'])
                setReview(data['review'])
                setPriority(data['Priority'])
                setBudget(data['Budget'])
                setConsequences(data['Consequences'])
                setCompetition(data['Competition'])
                setDifferentiation(data['Differentiation'])
                setMarketing(data['Marketing'])
            }
            catch (err) {
                const point = Math.floor(Math.random() * 50) + 10;
                setPoint(point)
            }
        }
    }

    function setIcon(status) {
        if (status == 'Good') {
            return BadgeCheck
        }
        else if (status == 'Normal') {
            return AlertTriangle
        }
        else if (status == 'Bad') {
            return AlertOctagon
        }
    }

    function setColor(status) {
        if (status == 'Good') {
            return 'text-green-500'
        }
        else if (status == 'Normal') {
            return 'text-yellow-500'
        }
        else if (status == 'Bad') {
            return 'text-red-500'
        }
    }

    function getBackgroundGradient(point) {
        if (point < 50) return 'bg-gradient-to-br from-red-300 to-red-500'
        if (point < 75) return 'bg-gradient-to-br from-orange-300 to-orange-500'
        return 'bg-gradient-to-br from-green-300 to-green-500'
    }

    const copyToClipboard = (text) => {
        return new Promise((resolve, reject) => {
            if (navigator.clipboard && window.isSecureContext) {
                // For modern browsers and secure contexts
                navigator.clipboard.writeText(text)
                    .then(resolve)
                    .catch(reject);
            } else {
                // Fallback for older browsers and mobile
                let textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                try {
                    document.execCommand('copy');
                    resolve();
                } catch (err) {
                    reject(err);
                } finally {
                    textArea.remove();
                }
            }
        });
    };

    const { toast } = useToast()
    const handleShareResults = () => {
        copyToClipboard(window.location.href).then(() => {
            toast({
                title: "Link copied to clipboard!",
                description: "Ready to share to everyone",
                action: <ToastAction altText="🎉">🎉</ToastAction>,
            })
        });
    };

    return (
        <div className={`min-h-screen p-6 px-[10%] lg:px-[20%] bg-gradient-to-br from-green-50 to-blue-100`}>
            {!loaded ? (
                <div className='flex items-center justify-center content-center h-[90vh]'>
                    <div className="flex flex-col items-center justify-center gap-5">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                        <div className='text-2xl font-mono text-black'>
                            Generating&nbsp;
                            {[...Array(3).keys()].map(i => (
                                <span className="animate-ping" style={{ animationDelay: `${i * 0.2}s` }} key={i}>.</span>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    <header className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-3xl font-bold text-indigo-700 mb-4 md:mb-0">Your Report 🚀</h1>
                        <div className="flex gap-4">
                            <a href='../'>
                                <Button variant="outline" className="border-indigo-500 text-indigo-500 hover:bg-indigo-50">
                                    New Audit
                                </Button>
                            </a>
                            <Button className="bg-indigo-500 hover:bg-indigo-600 text-white" onClick={handleShareResults}>Share Results</Button>
                        </div>
                    </header>

                    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="flex items-center space-x-4">
                            <div className={`w-16 h-16 rounded-full ${getBackgroundGradient(point)} text-white flex items-center justify-center text-2xl font-bold shadow-inner`}>
                                {point}
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800">{brief}</h2>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 leading-relaxed">{review}</p>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Priority', icon: setIcon(Priority[0]), color: setColor(Priority[0]), content: Priority[1] },
                            { title: 'Budget', icon: setIcon(Budget[0]), color: setColor(Budget[0]), content: Budget[1] },
                            { title: 'Consequences', icon: setIcon(Consequences[0]), color: setColor(Consequences[0]), content: Consequences[1] },
                            { title: 'Competition', icon: setIcon(Competition[0]), color: setColor(Competition[0]), content: Competition[1] },
                            { title: 'Differentiation', icon: setIcon(Differentiation[0]), color: setColor(Differentiation[0]), content: Differentiation[1] },
                            { title: 'Marketing', icon: setIcon(Marketing[0]), color: setColor(Marketing[0]), content: Marketing[1] },
                        ].map((item, index) => (
                            <Card key={index} className="bg-white hover:shadow-md transition-shadow duration-300">
                                <CardHeader className="flex items-center space-x-3">
                                    <item.icon className={`${item.color} w-6 h-6`} />
                                    <h3 className="font-semibold text-lg text-black">{item.title}</h3>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">{item.content}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card className="bg-gradient-to-r from-orange-100 to-amber-100 shadow-md">
                        <CardHeader>
                            <h2 className="text-xl font-semibold text-gray-800">Need a more specialized advice to make a profitable business?</h2>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-700">Gain clarity with 9 actionable marketing ideas. Acquire more users, nurture them with content, and enjoy new sales.</p>
                            <div className="flex w-full h-full">
                                <a>
                                    <button className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white">Contact us for free</button>
                                </a>
                                {/* <input type="email" placeholder="Your email" className="px-4 py-2 rounded-none rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-[70%] bg-white text-black" />
                                <button className="px-4 py-2 rounded-none rounded-r-md bg-zinc-800 hover:bg-zinc-700 text-white">Contact us for free</button> */}
                            </div>
                        </CardContent>
                    </Card>

                    {/* {['User Acquisition Ideas', 'Content Marketing Ideas', 'Conversion Rate Optimization Ideas'].map((section, index) => (
                        <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <h2 className="text-xl font-semibold text-gray-800">{`3 ${section}`}</h2>
                                <p className="text-sm text-gray-600">
                                    {index === 0 && "Get high-quality traffic that wants to buy your product"}
                                    {index === 1 && "Nurture your audience with helpful content"}
                                    {index === 2 && "Convert interested visitors into happy customers"}
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="bg-gray-50 p-3 rounded-md">
                                        <p className="text-gray-700">Idea details would go here...</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))} */}

                    <Button className="w-full py-5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 font-3xl">
                        Explore More Free Tools
                    </Button>

                    <footer className="mt-8 text-center text-sm text-gray-500 space-x-4">
                        <a href="#" className="hover:text-gray-700 transition-colors duration-300">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-700 transition-colors duration-300">Terms of Service</a>
                        <a href="#" className="hover:text-gray-700 transition-colors duration-300">QuyVuong</a>
                    </footer>

                </div>
            )}

            <style jsx global>{`
            @keyframes gradient {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
            }
            .animated-gradient {
            background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
            }
        `}</style>

        </div>
    );
}