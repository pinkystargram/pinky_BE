const postService = require('../service/post.service');

module.exports = {
    post: async (req, res) => {
        const { content } = req.body;
        const image = req.file.location;
        console.log('postimage', req.file);
        const userId = '3d5ae106-1c0b-4ea0-8df1-0fb7229c07c0';
        try {
            await postService.createPost(userId, content, image);
            res.status(201).json({
                result: true,
                data: [
                    {
                        postId: '',
                        userId: '',
                        nickname: '',
                        content: '',
                        imageUrl: '',
                        commentCount: '',
                        likeCount: '',
                        commentList: [
                            {
                                commentId: '',
                                userId: '',
                                nickname: '',
                                content: '',
                                createdAt: '',
                                profileImageUrl: '',
                            },
                        ],
                        likeList: [
                            {
                                userId: '',
                            },
                        ],
                    },
                ],
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: false,
                message: '게시글 작성 중 오류가 발생하였습니다.',
            });
        }
    },
};
