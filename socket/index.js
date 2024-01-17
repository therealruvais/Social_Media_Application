const io = require("socket.io")(8000, {
  cors: { origin: "http://localhost:5173" },
});

let activeUsers = [];

io.on("connection", (socket) => {
  //add new user
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
      console.log("New User Connected", activeUsers);
    }
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  socket.on("send-message", (data) => {
    const { recieverId } = data;
    const user = activeUsers.find((user) => user.userId === recieverId);
    console.log("sending from socket to :", recieverId);
    console.log("Data", data);
    console.log("Found user:", user);

    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
      console.log("Sent recieve-message event to:", user.userId);
      console.log("Sent event to socket id:", user.socketId);
      console.log("Data:", data);
      console.log("Message sent successfully");
    } else {
      console.log("Recipient user not found");
    }
  });
});
