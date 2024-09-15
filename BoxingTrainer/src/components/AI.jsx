import React, { useState } from 'react';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: '', // Keep your API key in .env for security reasons.
    dangerouslyAllowBrowser: true,
});

// Create the prompt for OpenAI API
const createPrompt = (pcount, averagePunch, velocityArray, totalTime) => {
    const velocityData = velocityArray
        .map((v) => `${v.name}: ${v.velocity}`)
        .join(', ');
    return `
    Here is the data from a user's boxing session:
    - Total number of punches: ${pcount}
    - Average punches per minute: ${averagePunch}
    - Velocity data: ${velocityData}
    - Total time in seconds: ${totalTime}
    Based on this data, provide advice on how the user can improve their boxing performance. Focus on speed, accuracy, and stamina, and give 2 criticisms and 2 compliments. speak naturally and break up your advice with "\ns"
  `;
};

// Call OpenAI API for boxing advice
const getBoxingAdvice = async (
    pcount,
    averagePunch,
    velocityArray,
    totalTime
) => {
    try {
        const prompt = createPrompt(
            pcount,
            averagePunch,
            velocityArray,
            totalTime
        );
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are a boxing coach providing feedback on performance displayed on a web app so break up your text',
                },
                { role: 'user', content: prompt },
            ],
            max_tokens: 4096,
            temperature: 0.7,
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching advice:', error);
        return 'There was an error fetching the boxing advice.';
    }
};

// Function to trigger the Web Speech API to read advice aloud
const readAdviceAloud = (advice) => {
    const speech = new SpeechSynthesisUtterance(advice);
    speech.lang = 'en-US'; // Set language
    speech.pitch = 1; // Set pitch
    speech.rate = 1; // Set rate of speech
    window.speechSynthesis.speak(speech);
};

// Function to stop the speech
const stopAdviceAloud = () => {
    window.speechSynthesis.cancel();
};

// React component that accepts props from a parent
const BoxingAdviceComponent = ({
    pcount,
    averagePunch,
    velocityArray,
    totalTime,
}) => {
    const [advice, setAdvice] = useState('');

    const handleGetAdvice = async () => {
        const advice = await getBoxingAdvice(
            pcount,
            averagePunch,
            velocityArray,
            totalTime
        );
        setAdvice(advice);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Boxing Performance Advice</h1>
            <div className="my-4">
                <button
                    className="bg-blue-500 text-black px-4 py-2 rounded"
                    onClick={handleGetAdvice}
                >
                    Get Boxing Advice
                </button>
                {advice && (
                    <>
                        <button
                            className="bg-green-500 text-black px-4 py-2 rounded ml-4"
                            onClick={() => readAdviceAloud(advice)}
                        >
                            Read Advice Aloud
                        </button>
                        <button
                            className="bg-red-500 text-black px-4 py-2 rounded ml-4"
                            onClick={stopAdviceAloud}
                        >
                            Stop Reading
                        </button>
                    </>
                )}
            </div>
            {advice && (
                <div className="p-4 shadow-md rounded">
                    <h2 className="text-xl font-semibold">Advice:</h2>
                    <p>{advice}</p>
                </div>
            )}
        </div>
    );
};

export default BoxingAdviceComponent;
