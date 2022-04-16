const postService = require('../service/post.service');

module.exports = {
    post: async (req, res) => {
        const { content, location } = req.body;
        const image = req.file.location;
        const userId = '3d5ae106-1c0b-4ea0-8df1-0fb7229c07c0';
        try {
            await postService.createPost(userId, content, image, location);
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
    viewPost: async (req, res) => {
        const userId = '3d5ae106-1c0b-4ea0-8df1-0fb7229c07c0';
        console.log('find', await postService.findPost(userId));
        try {
            const data = await postService.findPost(userId);
            console.log(data);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: false,
                message: '게시글 조회 중 오류가 발생하였습니다.',
            });
        }
    },
};
