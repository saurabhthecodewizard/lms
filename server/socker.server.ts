import { Server as SocketIOServer } from 'socket.io'
import http from 'http';

export const initializeSocketServer = (server: http.Server) => {
    const io = new SocketIOServer(server);

    io.on('connection', (socket) => {
        console.log('User connected to socket server');

        // Listening to notification event on client
        socket.on('notification', (data) => {
            // broadcast to all clients i.e. admin dashboard
            io.emit('newNotification', data);
        })

        socket.on('disconnect', () => {
            console.log('User disconnected from socket server');
        })
    })
}