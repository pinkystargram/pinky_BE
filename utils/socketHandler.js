const chatService = require('../chat/service/chat.service');

const io = require('../config/socket').getIo();

/**
 *   emit : 데이터 전송 (서버-> 클라이언트 / 클라이언트  -> 서버)
 *     on : 데이터를 받는다 (서버-> 클라이언트 / 클라이언트 -> 서버)
 *   room : 특정 room에게 메세지를 보내려면 io.to('룸이름').emit()
 *   join : socket.join으로 룸에 접속한다.
 *  leave : socket.leave로 룸에서 나간다.
 */

io.on('connection', (socket) => {
    console.log(`User : ${socket.id}`);
    socket.on('disconnect', () => {
        console.log('user disconnect');
        clearInterval(socket.interval);
    });

    // socket error
    socket.on('error', (error) => {
        console.error(error);
    });

    socket.on('chat message', (msg) => {
        console.log(msg);
        socket.emit('chat message', msg);
    });

    // 소켓 로그인
    // front 에서는 'login'이라는 이름으로 로그인된 userId를 넘겨주어야 한다.(emit)
    socket.on('login', (userId) => {
        console.log(userId);
        socket.join(userId);
    });

    // socket room join
    // 프론트에서 내 userId와 상대방 targetId를 가져온다.
    // userId와 targetId로 같이 roomId를 찾아서 roomId로 room에 join한다
    socket.on('joinRoom', async (userId, targetId, roomId) => {
        console.log('joinRoom', ' userId : ', userId, ' targetId : ', targetId);
        try {
            const findRoom = await chatService.findRoom({
                userId,
                targetId,
                roomId,
            });
            socket.join(findRoom);
            socket.leave(userId);
        } catch (error) {
            console.log(error);
        }
    });

    // socket room leave
    socket.on('leaveRoom', async ({ userId, targetId }) => {
        console.log(
            'leaveRoom',
            ' userId : ',
            userId,
            ' targetId : ',
            targetId
        );
        try {
            const roomId = await chatService.findRoom({
                userId,
                targetId,
            });
            socket.leave(roomId);
        } catch (error) {
            console.log(error);
        }
    });

    // socket room (chat)
    socket.on('room', async ({ roomId, fromSnsId, toSnsId, chatText }) => {
        try {
            const chatMessage = {
                toSnsId,
                fromSnsId,
                chatText,
            };

            await chatService.saveChatMessage({
                roomId,
                ...chatMessage,
            });

            io.to(roomId).emit('chat', chatMessage);
            io.to(toSnsId).emit('list', chatMessage);
        } catch (error) {
            console.log(error);
        }
    });
});
