const postService = require('../service/post.service');

module.exports = {
    post: async (req, res) => {
        const { content, location } = req.body;
        if (!req.file) {
            return res.status(400).json({
                result: false,
                message: '이미지를 등록해주세요.',
            });
        }
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
                        profileImageUrl,
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
            const createdAt = postService.timeForToday(data.createdAt);
            const commentList = [];
            for (let i = 0; i < data.Comments.length; i++) {
                const commentId = data.Comments[i].commentId;
                const userId = data.Comments[i].userId;
                const nickname = data.Comments[i].user.nickname;
                const content = data.Comments[i].content;
                const createdTime = data.Comments[i].createdAt;
                const updatedAt = data.Comments[i].updatedAt;
                const profileImageUrl = data.Comments[i].user.profileImageUrl;
                const createdAt = postService.timeForToday(createdTime);
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
                    createdAt: createdAt,
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
        const { userId } = res.locals;

        try {
            const followList = await postService.followList(userId);
            const confirmFollow = followList.length;
            let arrTargetId = [];
            let data = [];
            if (confirmFollow !== 0) {
                for (x of followList) {
                    const { targetId } = x;
                    arrTargetId.push({ userId: targetId });
                }
                const followPostList = await postService.followPostList(
                    arrTargetId
                );
                for (i of followPostList) {
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
                        updatedAt,
                        Comments,
                        Likes,
                        Bookmarks,
                    } = i;

                    let { createdAt } = i;
                    createdAt = postService.timeForToday(createdAt);

                    let likeState = false;
                    let bookmarkState = false;
                    for (j of Likes) {
                        const confirmLike = res.locals.userId;
                        if (confirmLike === j.userId) {
                            likeState = true;
                        }
                    }
                    for (j of Bookmarks) {
                        const confirmBookmark = res.locals.userId;
                        if (confirmBookmark === j.userId) {
                            bookmarkState = true;
                        }
                    }

                    let comment = [];
                    for (j of Comments) {
                        const {
                            commentId,
                            userId,
                            content,
                            updatedAt,
                            profileImageUrl,
                        } = j;

                        let { createdAt } = j;
                        createdAt = postService.timeForToday(createdAt);

                        const { nickname } = j.user;
                        comment.push({
                            commentId,
                            userId,
                            nickname,
                            content,
                            createdAt,
                            updatedAt,
                            profileImageUrl,
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
                        likeState,
                        bookmarkState,
                        createdAt,
                        updatedAt,
                        commentList: comment,
                        Likes,
                        Bookmarks,
                    });
                }
                let nonFolTargetId = [];
                let nonFolUserId = [];
                let userIdList = [];
                const findUserList = await postService.findUserList();
                for (x of findUserList) {
                    userIdList.push(x.userId);
                }
                for (x of arrTargetId) {
                    nonFolUserId.push(x.userId);
                }
                for (let i = 0; i < userIdList.length; i++) {
                    for (j of nonFolUserId) {
                        if (userIdList[i] === j) {
                            userIdList.splice(i, 1);
                        }
                    }
                }
                for (i of userIdList) {
                    nonFolTargetId.push({ userId: i });
                }
                const nonFollowerPostList =
                    await postService.nonFollowerPostList(nonFolTargetId);
                for (i of nonFollowerPostList) {
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
                        updatedAt,
                        Comments,
                        Likes,
                        Bookmarks,
                    } = i;

                    let { createdAt } = i;
                    createdAt = postService.timeForToday(createdAt);

                    let likeState = false;
                    let bookmarkState = false;
                    for (j of Likes) {
                        const confirmLike = res.locals.userId;
                        if (confirmLike === j.userId) {
                            likeState = true;
                        }
                    }
                    for (j of Bookmarks) {
                        const confirmBookmark = res.locals.userId;
                        if (confirmBookmark === j.userId) {
                            bookmarkState = true;
                        }
                    }

                    let comment = [];
                    for (j of Comments) {
                        const {
                            commentId,
                            userId,
                            content,
                            updatedAt,
                            profileImageUrl,
                        } = j;
                        let { createdAt } = j;
                        createdAt = postService.timeForToday(createdAt);
                        const { nickname } = j.user;
                        comment.push({
                            commentId,
                            userId,
                            nickname,
                            content,
                            createdAt,
                            updatedAt,
                            profileImageUrl,
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
                        likeState,
                        bookmarkState,
                        createdAt,
                        updatedAt,
                        commentList: comment,
                        Likes,
                        Bookmarks,
                    });
                }
                return res.status(201).json({ result: true, data });
            } else {
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
                            updatedAt,
                            Comments,
                            Likes,
                            Bookmarks,
                        } = i;

                        let { createdAt } = i;
                        createdAt = postService.timeForToday(createdAt);

                        let likeState = false;
                        let bookmarkState = false;
                        for (j of Likes) {
                            const confirmLike = res.locals.userId;
                            if (confirmLike === j.userId) {
                                likeState = true;
                            }
                        }
                        for (j of Bookmarks) {
                            const confirmBookmark = res.locals.userId;
                            if (confirmBookmark === j.userId) {
                                bookmarkState = true;
                            }
                        }

                        let comment = [];
                        for (j of Comments) {
                            const {
                                commentId,
                                userId,
                                content,
                                updatedAt,
                                profileImageUrl,
                            } = j;
                            let { createdAt } = j;
                            createdAt = postService.timeForToday(createdAt);
                            const { nickname } = j.user;
                            comment.push({
                                commentId,
                                userId,
                                nickname,
                                content,
                                createdAt,
                                updatedAt,
                                profileImageUrl,
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
                            likeState,
                            bookmarkState,
                            createdAt,
                            updatedAt,
                            commentList: comment,
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
                        message:
                            '팔로우가 없는 회원의 전체 게시글 조회 중 오류가 발생하였습니다.',
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: false,
                message: '전체 게시글 조회 중 오류가 발생하였습니다.',
            });
        }
    },
    deletePost: async (req, res) => {
        try {
            const { userId } = res.locals;
            const { postId } = req.params;
            await postService.deletePost(postId, userId);
            res.status(201).json({ result: true });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: false,
                message: '게시글 삭제 중 오류가 발생하였습니다.',
            });
        }
    },
    updatePost: async (req, res) => {
        const { content, location } = req.body;
        const { postId } = req.params;
        const userId = res.locals.userId;
        try {
            await postService.updatePost(postId, userId, content, location);

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
                        profileImageUrl,
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
