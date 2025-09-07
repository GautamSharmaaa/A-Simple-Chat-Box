# A Simple Chat Box using WebSockets 

A **real-time chat application** built with **React** (frontend) and **Node.js + WebSocket (ws)** (backend).  
Users can join a room and chat instantly, with a **neon orange & black theme**.  

---

## ✨ Features

- Real-time messaging with **WebSockets**
- Multi-user support in the **same room**
- Responsive UI with **neon orange & black theme**
- Sender messages on **right**, receiver messages on **left**
- Press `Enter` or click **Send** to send messages
- Rounded chat bubbles with **interactive send button**
- Clean and modern design with shadow effects  

## ⚡ Backend (`index.ts`)

- Uses **ws** package to create a WebSocket server.
- Handles:
  - `join` → Add users to a room
  - `chat` → Broadcast messages to other users in the same room
- Logs connection, message, and disconnection events  

**Start backend server:**

```bash
# Install dependencies
npm install ws

# Run server
ts-node server.ts
````

Server runs on: `ws://localhost:8080`

---

## 🎨 Frontend (`App.tsx`)

* Built with **React + TypeScript + Tailwind CSS**
* Connects to WebSocket backend
* **UI Highlights:**

  * Scrollable messages container
  * Input field with **interactive send button**
  * Responsive chat bubbles

**Start frontend:**

```bash
# Install dependencies
npm install

# Run React app
npm start
```

Open in browser: `http://localhost:3000`

---

## 📝 Usage

1. Start the **backend** server.
2. Start the **frontend** React app.
3. Open multiple tabs or browsers to simulate multiple users.
4. Users automatically join room `"red"`.
5. Type a message and press **Enter** or click **Send**.
6. Messages are instantly sent to all other users in the room.

---

## 💻 Technologies Used

| Frontend           | Backend              | Styling                   |
| ------------------ | -------------------- | ------------------------- |
| React + TypeScript | Node.js + TypeScript | Tailwind CSS              |
| WebSocket API      | ws package           | Neon orange & black theme |

---

## 📸 Screenshots

<img width="1710" height="976" alt="Screenshot 2025-09-07 at 5 49 00 PM" src="https://github.com/user-attachments/assets/90ebd99f-6461-402b-b06d-423d77842023" />

---

Made by **Gautam Sharma**
