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
    viewPostList: async (req, res) => {
        // const { userId } = res.locals.user;
        const userId = '24ad089c-6336-46dc-9414-86604c048ac2';

        try {
            const postList = await postService.postList();

            let data = [];

            for (i of postList) {
                const likes = i.Likes;
                const likeCount = likes.length;

                const comments = i.Comments;
                const commentCount = comments.length;

                const { nickname } = i.user;
                const {
                    postId,
                    userId,
                    content,
                    imageUrl,
                    location,
                    createdAt,
                    updatedAt,
                } = i;
                let comment = [];
                const { Comments, Likes, Bookmarks } = i;
                for (j of Comments) {
                    const {
                        commentId,
                        userId,
                        postId,
                        content,
                        createdAt,
                        updatedAt,
                    } = j;
                    const { nickname } = j.user;
                    comment.push({
                        commentId,
                        userId,
                        nickname,
                        content,
                        createdAt,
                        updatedAt,
                    });
                }
                data.push({
                    postId,
                    userId,
                    nickname,
                    content,
                    imageUrl,
                    location,
                    commentCount,
                    likeCount,
                    createdAt,
                    updatedAt,
                    comment,
                    Likes,
                    Bookmarks,
                });
            }
            res.status(201).json({
                result: true,
                data,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: false,
                message: '전체 게시글 조회 중 오류가 발생하였습니다.',
            });
        }
    },
    viewPostList2: async (req, res) => {
        const userId = '2e600ecf-d1ee-41ef-8679-b2d01c7d3c13';

        try {
            const followList = await postService.followList(userId);
            res.status(201).json({ result: true, followList });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: false,
                message: '팔로우 게시글 조회 중 오류가 발생하였습니다.',
            });
        }
    },
};
