'use client'
// import * as readline from 'node:readline/promises';
// import { stdin as input, stdout as output } from 'node:process';
import { useState } from 'react';

export default function Page() {
    const [user, setUser] = useState("Quy");
    const [message, setMsg] = useState("");
    const [resArr, updateArr] = useState([]);

    async function interact(request) {
        let data = await fetch(`https://general-runtime.voiceflow.com/state/user/${encodeURI(user)}/interact`, {
            headers: { Authorization: process.env.NEXT_PUBLIC_API_KEY, 'Content-Type': 'application/json', versionID: 'production' },
            method: "POST",
            body: JSON.stringify({ request })
        })
        return data.json()
    }

    // INIT
    interact({
        type: 'launch'
    })

    const handleClick = async () => {

        let postRes = await interact({
            "type": 'text',
            "payload": JSON.stringify(message),
        });
        console.log(message);
        console.log(postRes);
        for (let i = 0; i < postRes.length; i++) {
            if (postRes[i].type === "text") {
                updateArr(arr => [...arr, message + ">" + postRes[i].payload.message]);
            }
        }
    }


    const handleChangeUser = (event) => setUser(event.target.value);

    const handleChange = (event) => setMsg(event.target.value);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <label className="app-label">
                Username: <input type="text" name="name" value={user} onChange={handleChangeUser} />
            </label>
            <label className="app-label">
                Message: <input type="text" onChange={handleChange} />
                <button className="send-button" type="submit" onClick={handleClick}>Send</button>
            </label>
            <div>
                {resArr.map((value, index) =>
                    <p key={index}>{value}<br /></p>
                )}
            </div>
            <p>{'>'} {message} </p>
        </div>
    );
}