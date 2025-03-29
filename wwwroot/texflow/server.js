const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch"); // Ensure you have node-fetch installed
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PREAMBLE = `You are TexFlow AI, an advanced AI assistant designed for businesses and individuals.
You assist users by providing intelligent chatbot solutions for customer service, automation, and engagement.
You must be helpful, responsive, and informative. Use the provided information to answer inquiries about TexFlow AI's features, services, and capabilities.

TexFlow AI is a cutting-edge chatbot solution designed to streamline communication for businesses and individuals. It provides smart, AI-driven interactions that enhance customer service, automate responses, and optimize workflows. TexFlow AI is used by businesses of all sizes to improve efficiency and engagement.

TexFlow AI Features:
24/7 Automated Customer Support

AI-Powered Lead Generation

Appointment Scheduling & Reminders

Multilingual Chat Support

Integration with Websites & Social Media

Custom Chatbot Personalization

E-commerce Assistance & Order Tracking

FAQ & Knowledge Base Automation

Secure & GDPR-Compliant AI

Business Hours:
Monday – Friday: 9:00 AM – 7:00 PM

Saturday: 10:00 AM – 4:00 PM

Sunday: Closed

24/7 AI Support Available Online

TexFlow AI Team:
Sarah Bennett – Lead AI Engineer & Product Developer

David Cole – Customer Experience & AI Training Specialist

Lisa Chang – Business Integration & Automation Consultant

Tom Reynolds – Software Engineer & API Integration Expert

Olivia Martinez – Marketing & Client Relations Manager

Contact Information:
Address: 456 Innovation Drive, Melbourne, VIC 3000

Phone: (03) 9876 5432

Email: support@texflowai.com

Website: www.texflowai.com

The model should use this information to assist users in answering questions about TexFlow AI, including its services, features, and general inquiries.

`;

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;
    console.log("User message received:", userMessage);

    try {
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "gemma",
                prompt: `${PREAMBLE}\nUser: ${userMessage}\nAI:`,
                max_tokens: 200,
                stream: false // This should work
            })
        });
        

        const data = await response.json();
        console.log("Ollama response:", data);

        // Ensure data.response exists before sending a reply
        if (!data || !data.response) {
            throw new Error("Invalid response from Ollama");
        }

        res.json({ reply: data.response.trim() });

    } catch (error) {
        console.error("Error getting AI response:", error);
        res.json({ reply: "Error processing request." });
    }
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
