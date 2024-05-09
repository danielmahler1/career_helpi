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
        model: "gpt-4-turbo",
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
