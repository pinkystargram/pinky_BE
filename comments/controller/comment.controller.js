const commentService = require('../service/comment.service');

module.exports = {
    postComment: async (req, res) => {
        // const { userId } = res.locals.user;
        const { postId } = req.params;
        const userId = 'dcafc73d-07c6-4df3-9472-2608c30c3f6d';
        const { content } = req.body;

        try {
            await commentService.createComment(userId, postId, content);
            res.status(201).json({
                result: true,
                data: [
                    {
                        commentList: [
                            {
                                commentId: '댓글id',
                                userId: '',
                                nickname: '',
                                content: '',
                                createdAt: '',
                                updatedAt: '',
                                profileImageUrl: '',
                            },
                        ],
                    },
                ],
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: false,
                message: '댓글 작성 중 오류가 발생하였습니다.',
            });
        }
    },

    listComment: async (req, res) => {
        const { postId } = req.params;

        try {
            const a = await commentService.findComment(postId);
            res.status(201).json({ a });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: false,
                message: '댓글 조회 중 오류가 발생하였습니다.',
            });
        }
    },
};
