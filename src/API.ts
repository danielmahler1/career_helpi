// api.ts
import axios from 'axios';

const openAIEndpoint = 'https://api.openai.com/v1/completions';

/**
 * Fetches career advice from OpenAI based on the provided text prompt.
 * @param prompt A string representing the user's input or question.
 * @returns A promise that resolves to the response from OpenAI, processed as a string.
 */
const getCareerAdvice = async (prompt: string): Promise<string> => {
  // Retrieve the API key from localStorage
  const apiKey = localStorage.getItem('MYKEY');
  
  // Check if the API key is retrieved correctly
  if (!apiKey || apiKey === '') {
    throw new Error("API key is not set or is empty. Please enter your API key.");
  }

  try {
    // Make the POST request to the OpenAI API with the necessary headers
    const response = await axios.post(openAIEndpoint, {
      model: "gpt-4-turbo",
      prompt: prompt,
      max_tokens: 150,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    // Return the response from the API call
    return response.data.choices[0].text.trim();
  } catch (error) {
    // If the error is an AxiosError, handle it accordingly
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error?.message || 'An unknown error occurred';
      throw new Error(`Error fetching career advice: ${message}`);
    } else {
      // Handle any other errors that might have occurred
      throw new Error(`Error fetching career advice: ${error}`);
    }
  }
};

export default getCareerAdvice;
