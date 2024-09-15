import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: 'Here',
});

// Example data
const punchVelocities = [2.5, 3.0, 2.9, 3.1, 2.8, 3.2]; // Every 10ms
const totalPunches = 50;
const badPunches = 5;
const avgPunchesPerMin = [30, 32, 35, 33, 34]; // Example over 5 minutes

// Create the prompt
const createPrompt = (
    punchVelocities,
    totalPunches,
    badPunches,
    avgPunchesPerMin
) => {
    return `Here is the data from a user's boxing session:
- Punch velocities: ${punchVelocities}
- Total punches: ${totalPunches}
- Number of bad punches (Bad punches means they did not have the proper form): ${badPunches}
- Average punches per minute over time: ${avgPunchesPerMin}
Based on this data, provide advice on how the user can improve their boxing performance, focusing on speed, accuracy, and stamina. give 2 critisims and 2 compliments `;
};

// Call OpenAI API for boxing advice
const getBoxingAdvice = async (
    punchVelocities,
    totalPunches,
    badPunches,
    avgPunchesPerMin
) => {
    try {
        const prompt = createPrompt(
            punchVelocities,
            totalPunches,
            badPunches,
            avgPunchesPerMin
        );

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // or "gpt-3.5-turbo"
            messages: [
                {
                    role: 'system',
                    content:
                        'You are a boxing coach providing feedback on performance. give as much feedback as possible consider how different factors play into eachother',
                },
                { role: 'user', content: prompt },
            ],
            max_tokens: 4096,
            temperature: 0.7,
        });

        console.log('Boxing Improvement Advice:');
        console.log(completion.choices[0].message.content);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

// Get advice based on the boxing data
getBoxingAdvice(punchVelocities, totalPunches, badPunches, avgPunchesPerMin);
