'use client'
// import * as readline from 'node:readline/promises';
// import { stdin as input, stdout as output } from 'node:process';
import { useEffect, useState } from 'react';
import OpenAI from "openai";

export default function Page() {
    const [data, setData] = useState(null)
    let count = 0
    const openai = new OpenAI({
        apiKey: process.env.API_KEY, dangerouslyAllowBrowser: true
    });
    

    useEffect(() => {
        const systemPrompt = `
            You are an expert at structured data extraction.
            # Character
            You're an idea validator who reviews ideas in detail and grades them from 0 to 100 using key metrics classified only as "Normal," "Bad," or "Good."

            ## Skills
            ### Skill 1: Evaluate Idea
            - Review the provided idea.
            - Consider aspects such as unique angle, audience targeting, and competitive landscape.
            - Provide an evaluation score between 0-100.

            ### Skill 2: Provide Detailed Review
            - Write a brief summary and a detailed review of the idea.
            - Highlight key areas such as Priority, Budget, Consequences, Competition, Differentiation, and Marketing.

            ## Constraints:
            - Grades for key metrics should only be "Normal", "Bad," or "Good."

            ## Output
            Don't Comment anything unnecessary
            No special characters or code formatting
            Always output exactly in json format like below

            ## Example Input
            {
            "idea": "Waifus image generator",
            "customer": "everyone"
            }
            ## Example Output
            {
                "score": 50,
                "brief": "You have better things to do.",
                "review": "Your waifu image generator shows some potential, particularly if you can find a unique angle in a crowded market. However, the lack of urgency, a distinct audience willing to spend, and the competitive landscape are significant hurdles. You may want to refine your audience targeting and clarify what makes your product stand out before moving forward.",
                "Priority": ["Normal","While the concept of an image generator may appeal to some, it's hard to say it's a top priority for a broad audience. Most individuals have daily concerns that likely center around more pressing needs like work, health, and relationships. This product may attract a niche interest, particularly among anime fans, but lacks widespread urgency."],
                "Budget":["Normal","Your target audience likely doesn't have a well-defined budget for this specific type of product. While there are markets that pay for custom art or related content, people generally expect digital solutions like this to be free or very low-cost. This leads to a challenge in monetizing the product effectively."],
                "Consequences":["Bad","The consequences of not having a waifu image generator seem minimal. People are not likely to feel severe negative impacts from the absence of such a tool. This creates a barrier, as potential users may not feel a pressing need to seek out your solution, making it easy for them to ignore."],
                "Competition":["Good","There's significant competition in the form of free and established platforms catering to art generation and anime content. Brands that operate in this space already have authority and loyal user bases, making it harder for a new player to break through. However, if you focus on something specific or unique within that space, there's still a chance to carve out a niche."],
                "Differentiation":["Normal","Finding a unique angle could be key, but the current concept lacks clarity on how it stands apart from existing tools. There is an opportunity to differentiate, perhaps by focusing on a specific style or unique features, but that also requires careful thought and execution to avoid becoming just another commodity product."],
                "Marketing":["Normal","Reaching your audience could be somewhat challenging due to the broad target of 'everyone.' While there are communities passionate about anime and art generation, you might struggle to pinpoint effective, budget-friendly marketing strategies that resonate across such a diverse group. A more focused audience could help refine these efforts."]
            }`

        const propmt = `{
            "idea": "AI Sigma AmongUs image generator",
            "customer": "Teenager"
            }`
        async function gpt() {
            count += 1
            console.log('called api')
            const data = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { "role": "system", "content": `${systemPrompt}` },
                    { "role": "user", "content": `${propmt}` }
                ],
                stream: false,
                temperature: 0.3,
                response_format: { "type": "json_object" }
            });
            console.log(data)
            const obj = data.choices[0].message.content;
            // const text = obj['choices'][0]['text']
            console.log(obj)
            // setData(text)
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
                            {[...Array(3).keys()].map(i => (
                                <span className="animate-ping" style={{ animationDelay: `${i * 0.2}s` }} key={i}>.</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}