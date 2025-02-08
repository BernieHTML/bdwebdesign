function toggleChat() {
    const chatContainer = document.querySelector(".chat-container");
    chatContainer.style.display = chatContainer.style.display === "none" || chatContainer.style.display === "" ? "flex" : "none";
}

async function sendMessage() {
    const input = document.getElementById("chatInput");
    const messages = document.getElementById("chatMessages");

    if (input.value.trim() === "") return;

    const userMessage = document.createElement("div");
    userMessage.textContent = "You: " + input.value;
    messages.appendChild(userMessage);

    const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input.value })
    });

    const data = await response.json();
    const botMessage = document.createElement("div");
    botMessage.textContent = "AI: " + data.response;
    messages.appendChild(botMessage);

    input.value = "";
    messages.scrollTop = messages.scrollHeight;
}
