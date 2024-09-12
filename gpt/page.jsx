'use client'
// import * as readline from 'node:readline/promises';
// import { stdin as input, stdout as output } from 'node:process';
import { useEffect, useState } from 'react';

export default function Page() {
    const [data, setData] = useState(null)
    let count = 0

    useEffect(() => {
        const systemPrompt = `# Character
            You're an idea validator, you review in detail ideas and grade them from 0 to 100.

            ## Skills
            - **Idea Scoring**: Assess the given idea on a scale of 0 to 100 based on various factors like utility, feasibility, market potential, and uniqueness.
            - **Detailed Review**: Provide a thorough review that addresses the strengths, weaknesses, opportunities, and threats (SWOT analysis) of the idea.
            - **Priority Assessment**: Evaluate how pressing or high-priority the problem is for the target customer.
            - **Budget Commentary**: Analyze the budget constraints and financial feasibility for the target customer.
            - **Consequences Analysis**: Discuss the potential positive and negative consequences for the target customer.
            - **Competition Review**: Review existing competition and the uniqueness of the idea.
            - **Differentiation and Innovation**: Suggest ways to differentiate the idea and highlight areas for innovative thinking.
            - **Marketing Strategy**: Provide insights into effective marketing strategies and highlight potential challenges in reaching the target audience.

            ## Constraints
            - Stick to the format provided in the example.
            - Reviews should be concise but comprehensive, focusing on critical factors.

            ## Example Input

            {
            "idea": "Homework solver using AI",
            "customer": "student"
            }

            ## Output
            Don't Comment anything unnecessary
            No special characters or code formatting
            Always output exactly in json format like below

            ## Example Output
            {
                "score": 63,
                "brief": "A decent attempt, but lacking that spark.",
                "review": "Your homework solver idea has potential strengths in addressing student pain points, especially related to consequences tied to academic performance. However, significant challenges lie in the competition, budget, and the perception of homework help—students generally prefer free solutions and may not see this as a priority. Consider how you can innovatively differentiate your solution and potentially build a budget-friendly offering to increase traction.",
                "Priority": "While students often struggle with homework, it may not be their top priority compared to social life and extracurricular activities. Many students may try to solve problems independently before seeking outside help, so this issue might be in the top five but not necessarily in the top three of their day-to-day worries.",
                "Budget": "Many students expect homework help to be free, either through peer support, available resources online, or free tutoring services. There is limited personal budget flexibility for high school or college students to pay for homework help, which could hinder the willingness to invest in a homework solver app.",
                "Consequences": "If students fail to understand their homework or complete it satisfactorily, they can face negative consequences, such as poor grades and stressed parents. Many students are indeed concerned about these repercussions, which makes this issue somewhat urgent. However, the consequences may not be severe enough to drive immediate action in all cases.",
                "Competition": "The market for educational apps, especially those providing homework help, is crowded with both established brands and newer competitors. While some platforms have solid traction and significant user bases, differentiating your solution could still be an uphill battle given the visibility of larger players in this space.",
                "Differentiation": "There are opportunities to stand out, particularly if your AI can provide unique features—like interactive learning or personalized tutoring experiences. However, articulating clear differentiation from existing solutions may require innovative thinking and additional research to see what gaps others haven't filled.",
                "Marketing": "Reaching students can be a challenge due to the saturation of platforms vying for their attention, from social media to educational websites. Although there are channels to market your product effectively, gaining traction might require creative approaches and significant initial effort to build awareness."
            }`
        const propmt = `{
            "idea": "AI Sigma AmongUs image generator",
            "customer": "Teenager"
            }`
        async function gpt() {
            count += 1
            console.log('called api')
            const data = await fetch("https://api.arliai.com/v1/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "Meta-Llama-3.1-8B-Instruct",
                    "prompt": `<|begin_of_text|><|start_header_id|>system<|end_header_id|>${systemPrompt}<|eot_id|><|start_header_id|>user<|end_header_id|>${propmt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n`,
                    "repetition_penalty": 1.1,
                    "temperature": 0.3,
                    "top_p": 0.9,
                    "top_k": 40,
                    "max_tokens": 1024,
                    "stream": false
                })
            });
            const obj = await data.json()
            const text = obj['choices'][0]['text']
            console.log(text)
            setData(text)
        }
        if (count == 0)
            gpt()
    }, [])

    return (
        <div className="max-w-4xl mx-auto p-6 rounded-lg">
            <div className='flex items-center justify-center content-center h-[90vh]'>
                <div>
                    <div className="flex flex-col items-center justify-center gap-5">
                        <div className="loading loading-spinner loading-lg w-[60%] text-blue-500"></div>
                        <div className='text-2xl font-mono'>
                            Generating&nbsp;
                            {[...Array(5).keys()].map(i => (
                                <span className="animate-ping" style={{ animationDelay: `${i * 0.2}s` }} key={i}>.</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}