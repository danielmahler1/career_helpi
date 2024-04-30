// api.ts
import axios from 'axios';

const openAIEndpoint = 'https://api.openai.com/v1/chat/completions';

/**
 * Fetches career advice from OpenAI based on the provided text prompt.
 * @param messages An array of message objects representing the conversation.
 * @returns A promise that resolves to the response from OpenAI, processed as a string.
 */
const getCareerAdvice = async (messages: {role: string, content: string}[]): Promise<string> => {
  const apiKey = localStorage.getItem('MYKEY');
  
  if (!apiKey) {
    throw new Error("API key is not set. Please enter your API key.");
  }

  try {
    const response = await axios.post(openAIEndpoint, {
      model: "gpt-4-turbo", // Use the appropriate model
      messages: messages, // Provide the messages array
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    // Assuming the response structure has a 'choices' array
    // with at least one 'message' object containing a 'content' string
    const lastMessage = response.data.choices[0].message.content;
    return lastMessage.trim();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error?.message || 'An unknown error occurred';
      throw new Error(`Error fetching career advice: ${message}`);
    } else {
      throw new Error(`Error fetching career advice: ${error}`);
    }
  }
};

export default getCareerAdvice;
