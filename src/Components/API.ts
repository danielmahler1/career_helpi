import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

// Define the endpoint for the OpenAI API
const openAIEndpoint = "https://api.openai.com/v1/chat/completions";

// Interface for a message from an AdviceSeeker
interface IMessage {
  role: string; // Role of the message sender ('user' or 'system')
  content: string; // Content of the message
}

// Class for handling communication with the AI API
class AIResponseHandler {
  private apiKey: string | null;

  constructor() {
    this.apiKey = localStorage.getItem("MYKEY"); // Retrieve the API key from local storage
  }

  // Method to get career advice from the OpenAI API
  public async getCareerAdvice(messages: IMessage[]): Promise<string> {
    if (!this.apiKey) {
      throw new Error("API key is not set. Please enter your API key.");
    }

    try {
      const response = await axios.post(
        openAIEndpoint,
        { model: "gpt-4-turbo", messages: messages },
        { headers: { Authorization: `Bearer ${this.apiKey}`, "Content-Type": "application/json" } }
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
  }
}

export default AIResponseHandler;
