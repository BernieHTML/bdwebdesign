const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch"); // Ensure you have node-fetch installed
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PREAMBLE = `You are an AI assistant for Plumbers Direct, a plumbing business. 
You assist customers by understanding their queries and customer service
You must be helpful but punctual. Use the provided information to respond to the user about any enquiries.

Plumbers Direct is a trusted local plumbing company with over 15 years of experience providing high-quality plumbing solutions for residential and commercial customers. The company is known for fast, reliable, and professional services at competitive prices.

Plumbers Direct offers the following services:
- Emergency Plumbing (24/7 Callouts)
- Blocked Drains & Drain Cleaning
- Hot Water System Repairs & Installations
- Leak Detection & Pipe Repairs
- Gas Fitting & Gas Leak Repairs
- Bathroom & Kitchen Renovations
- Tap & Toilet Repairs
- Roof & Gutter Plumbing
- Commercial Plumbing Services

Business Hours:
- Monday – Friday: 7:00 AM – 6:00 PM
- Saturday: 8:00 AM – 3:00 PM
- Sunday: Closed
- Emergency Callouts Available 24/7

Plumbers Direct team members:
- James Carter – Senior Plumber (15+ years experience)
- Daniel Thompson – Certified Gas Fitter & Pipe Repair Specialist
- Alex Robinson – Blocked Drains & Leak Detection Expert
- Michael Lewis – Hot Water System Technician
- Emma Wilson – Customer Service & Scheduling

Contact Information:
- Address: 123 Main Street, Sydney, NSW 2000
- Phone: (02) 1234 5678
- Email: support@plumbersdirect.com.au
- Website: www.plumbersdirect.com.au

The model should use this information to assist users in answering questions about Plumbers Direct, including services, availability, and general inquiries.
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

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
