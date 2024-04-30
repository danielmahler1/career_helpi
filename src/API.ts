// api.ts
import axios from 'axios';

const openAIEndpoint = 'https://api.openai.com/v1/completions';

/**
 * Fetches career advice from OpenAI based on the provided text prompt.
 * Retrieves the API key from localStorage.
 * @param prompt A string representing the user's input or question.
 * @returns A promise that resolves to the response from OpenAI, processed as a string.
 */
const getCareerAdvice = async (prompt: string): Promise<string> => {
  const apiKey = localStorage.getItem('MYKEY'); // Retrieve the API key from localStorage

  if (!apiKey) {
    throw new Error("API key is not set. Please enter your API key.");
  }

  try {
    const response = await axios.post(openAIEndpoint, {
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error fetching career advice:', error);
    return "Error fetching career advice. Please check the API key and network connection.";
  }
};

export default getCareerAdvice;
