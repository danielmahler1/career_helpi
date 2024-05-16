import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const openAIEndpoint = "https://api.openai.com/v1/chat/completions";
const getCareerAdvice = async (messages: { role: string; content: string }[]): Promise<string> => {
  const apiKey = localStorage.getItem("MYKEY");

  if (!apiKey) {
    throw new Error("API key is not set. Please enter your API key.");
  }

  try {
    const response = await axios.post(
      openAIEndpoint,
      {
        model: "gpt-4o",
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const lastMessage = response.data.choices[0].message.content;
    return lastMessage.trim();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error?.message || "An unknown error occurred";
      throw new Error(`Error fetching career advice: ${message}`);
    } else {
      throw new Error(`Error fetching career advice: ${error}`);
    }
  }
};

export default getCareerAdvice;

/*AI generated -  when API is inputted into the API.ts file it calls 
chat gpt-4o model to generate career advice based on the messages passed in. 
The API key is stored in local storage and is used to 
authenticate the request. The function returns the last message from the response. 
If an error occurs, it throws an error with a message that describes the error.
*/
