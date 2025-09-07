// Import WebSocket-related classes from the 'ws' package
import { WebSocketServer, WebSocket } from "ws";

// Create a WebSocket server instance that listens on port 8080
const wss = new WebSocketServer({ port: 8080 });

// Define a User interface for each connected client
interface User {
  socket: WebSocket;
  room: string;
}

// Store all active clients with their room info
let allSockets: User[] = [];

// Handle new WebSocket connections
wss.on("connection", (socket: WebSocket) => {
  console.log("✅ New client connected");

  // Handle messages from clients
  socket.on("message", (message) => {
    try {
      // Parse the raw message
      const parsedMessage = JSON.parse(message.toString());

      // Handle "join" message
      if (parsedMessage.type === "join") {
        allSockets.push({
          socket,
          room: parsedMessage.payload.roomId,
        });
        console.log(`👤 User joined room: ${parsedMessage.payload.roomId}`);
      }

      // Handle "chat" message
      if (parsedMessage.type === "chat") {
        const currentUser = allSockets.find((u) => u.socket === socket);
        if (!currentUser) return;

        // Broadcast only to *other* users in the same room
        allSockets.forEach((user) => {
          if (user.room === currentUser.room && user.socket !== socket) {
            user.socket.send(parsedMessage.payload.message);
          }
        });

        console.log(
          `💬 Message in room ${currentUser.room} (excluding sender): ${parsedMessage.payload.message}`
        );
      }
    } catch (err) {
      console.error("❌ Error parsing message:", err);
    }
  });

  // Handle client disconnect
  socket.on("close", () => {
    allSockets = allSockets.filter((u) => u.socket !== socket);
    console.log("❌ Client disconnected");
  });
});

// Startup message
console.log("🚀 WebSocket server running on ws://localhost:8080");
