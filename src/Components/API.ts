import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const openAIEndpoint = "https://api.openai.com/v1/chat/completions";

interface IMessage {
  role: string;  // Role of the message sender ('user' or 'system')
  content: string;  // Content of the message
}

class AIResponseHandler {
  private apiKey: string | null;

  constructor() {
    this.apiKey = localStorage.getItem("MYKEY");  // Retrieve the API key from local storage
  }

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
      return this.formatApiResponse(lastMessage);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error?.message || "An unknown error occurred";
        throw new Error(`Error fetching career advice: ${message}`);
      } else {
        throw new Error(`Error fetching career advice: ${error}`);
      }
    }
  }

  private formatApiResponse(text: string): string {
    // Convert **word** to <strong>word</strong>
    const boldedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert * bullet points to HTML list items
    const bulletText = boldedText.split('\n').map(line => {
      if (line.trim().startsWith('* ')) {
        return `<li>${line.trim().substring(2)}</li>`; // Remove '* ' and wrap in <li>
      }
      return line;
    }).join('\n');

    // Wrap lines that start with <li> with <ul> tags
    const formattedText = bulletText.replace(/(<li>.*?<\/li>)/g, (match) => `<ul>${match}</ul>`);

    return formattedText;
  }
}

export default AIResponseHandler;
