const postService = require('../service/post.service');

module.exports = {
    post: async (req, res) => {
        const { content, location } = req.body;
        const image = req.file.location;
        const userId = res.locals.userId;
        try {
            await postService.createPost(userId, content, image, location);

            const postList = await postService.postList();

            let data = [];

            for (let i of postList) {
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
                for (let j of Comments) {
                    const {
                        commentId,
                        userId,
                        postId,
                        content,
                        createdAt,
                        updatedAt,
                    } = j;
                    const { nickname, profileImageUrl } = j.user;
                    comment.push({
                        commentId,
                        userId,
                        nickname,
                        content,
                        createdAt,
                        updatedAt,
                        profileImageUrl
                    });
                }
                data.push({
                    postId,
                    userId,
                    nickname,
                    content,
                    imageUrl,
                    commentCount,
                    likeCount,
                    location,
                    // createdAt,
                    // updatedAt,
                    commentList: comment,
                    likeList: Likes,
                    // bookmarkList: Bookmarks,
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
                message: '게시글 작성 중 오류가 발생하였습니다.',
            });
        }
    },
    viewPost: async (req, res) => {
        const { postId } = req.params;
        const userId = res.locals.userId;

        try {
            const data = await postService.findPost(postId);
            const commentList = [];
            for (let i = 0; i < data.Comments.length; i++) {
                const commentId = data.Comments[i].commentId;
                const userId = data.Comments[i].userId;
                const nickname = data.Comments[i].user.nickname;
                const content = data.Comments[i].content;
                const createdAt = data.Comments[i].createdAt;
                const updatedAt = data.Comments[i].updatedAt;
                const profileImageUrl = data.Comments[i].user.profileImageUrl;
                commentList.push({
                    commentId,
                    userId,
                    nickname,
                    content,
                    createdAt,
                    updatedAt,
                    profileImageUrl,
                });
            }

            res.status(200).json({
                result: true,
                data: {
                    postId: data.postId,
                    userId: data.userId,
                    nickname: data.user.nickname,
                    content: data.content,
                    imageUrl: data.imageUrl,
                    likeCount: data.Likes.length,
                    location: data.location,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    commentList: commentList,
                    likeList: data.Likes,
                    bookmarkList: data.Bookmarks,
                },
            });
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
                message: '게시글 조회 중 오류가 발생하였습니다.',
            });
        }
    },
    updatePost: async (req, res) => {
        const { content } = req.body;
        const { postId } = req.params;
        const userId = res.locals.userId;
        try {
            await postService.updatePost(postId, content);

            const postList = await postService.postList();

            let data = [];

            for (let i of postList) {
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
                for (let j of Comments) {
                    const {
                        commentId,
                        userId,
                        postId,
                        content,
                        createdAt,
                        updatedAt,
                    } = j;
                    const { nickname, profileImageUrl } = j.user;
                    comment.push({
                        commentId,
                        userId,
                        nickname,
                        content,
                        createdAt,
                        updatedAt,
                        profileImageUrl
                    });
                }
                data.push({
                    postId,
                    userId,
                    nickname,
                    content,
                    imageUrl,
                    commentCount,
                    likeCount,
                    location,
                    // createdAt,
                    // updatedAt,
                    commentList: comment,
                    likeList: Likes,
                    // bookmarkList: Bookmarks,
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
                message: '게시글 작성 중 오류가 발생하였습니다.',
            });
        }
    },
};
