const commentService = require('../service/comment.service');

module.exports = {
    postComment: async (req, res) => {
        const { userId } = res.locals;
        const { postId } = req.params;
        const { content } = req.body;

        try {
            await commentService.createComment(userId, postId, content);

            let comment = await commentService.findComment(
                userId,
                postId,
                content
            );
            const { commentId, createdAt, updatedAt } = comment;
            const { nickname, profileImageUrl } = comment.user;

            const commentList = {
                commentId,
                userId,
                nickname,
                content,
                createdAt,
                updatedAt,
                profileImageUrl,
            };
            res.status(201).json({
                result: true,
                data: { commentList },
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: false,
                message: '댓글 작성 중 오류가 발생하였습니다.',
            });
        }
    },
    eraseComment: async (req, res) => {
        try {
            const { commentId } = req.params;
            const { userId } = res.locals;

            const confirmComment = await commentService.beforeDeleteComment(
                commentId,
                userId
            );
            if (confirmComment === null) {
                throw new Error('삭제할 댓글이 없습니다.');
            }
            await commentService.deleteComment(commentId, userId);
            res.status(201).json({ result: true });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: false,
                message: '댓글 삭제 중 오류가 발생하였습니다.',
            });
        }
    },
};
