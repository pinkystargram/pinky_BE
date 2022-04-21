const bookmarkService = require('../service/bookmark.service');
const postService = require('../../posts/service/post.service');

module.exports = {
    mark: async (req, res) => {
        try {
            const { postId } = req.params;
            const { userId } = res.locals;
            const confirmBookmark = await bookmarkService.findMark(
                postId,
                userId
            );
            if (confirmBookmark !== null) {
                await bookmarkService.unMarkPost(postId, userId);
                try {
                    const followList = await postService.followList(userId);
                    const confirmFollow = followList.length;
                    const userMe = res.locals.userId;
                    let arrTargetId = [];
                    let data = [];
                    if (confirmFollow !== 0) {
                        for (x of followList) {
                            const { targetId } = x;
                            arrTargetId.push({ userId: targetId });
                        }
                        arrTargetId.push({ userId: userMe });
                        const followPostList = await postService.followPostList(
                            arrTargetId
                        );
                        for (i of followPostList) {
                            const likes = i.Likes;
                            const likeCount = likes.length;

                            const comments = i.Comments;
                            const commentCount = comments.length;

                            const { nickname, profileImageUrl } = i.user;
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
                                } = j;

                                let { createdAt } = j;
                                createdAt = postService.timeForToday(createdAt);

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
                                location,
                                commentCount,
                                likeCount,
                                likeState,
                                bookmarkState,
                                profileImageUrl,
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
                            await postService.nonFollowerPostList(
                                nonFolTargetId
                            );
                        for (i of nonFollowerPostList) {
                            const likes = i.Likes;
                            const likeCount = likes.length;

                            const comments = i.Comments;
                            const commentCount = comments.length;

                            const { nickname, profileImageUrl } = i.user;
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
                                } = j;

                                let { createdAt } = j;
                                createdAt = postService.timeForToday(createdAt);

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
                                location,
                                commentCount,
                                likeCount,
                                likeState,
                                bookmarkState,
                                profileImageUrl,
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
                                const { nickname, profileImageUrl } = i.user;
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
                                    } = j;

                                    let { createdAt } = j;
                                    createdAt =
                                        postService.timeForToday(createdAt);

                                    const { nickname, profileImageUrl } =
                                        j.user;
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
                                    profileImageUrl,
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
                                    '게시글 북마크 중 오류가 발생하였습니다.',
                            });
                        }
                    }
                } catch (error) {
                    console.log(error);
                    res.status(400).json({
                        result: false,
                        message: '게시글 북마크 중 오류가 발생하였습니다.',
                    });
                }
            } else {
                await bookmarkService.MarkPost(postId, userId);
                try {
                    const followList = await postService.followList(userId);
                    const confirmFollow = followList.length;
                    const userMe = res.locals.userId;
                    let arrTargetId = [];
                    let data = [];
                    if (confirmFollow !== 0) {
                        for (x of followList) {
                            const { targetId } = x;
                            arrTargetId.push({ userId: targetId });
                        }
                        arrTargetId.push({ userId: userMe });
                        const followPostList = await postService.followPostList(
                            arrTargetId
                        );
                        for (i of followPostList) {
                            const likes = i.Likes;
                            const likeCount = likes.length;

                            const comments = i.Comments;
                            const commentCount = comments.length;

                            const { nickname, profileImageUrl } = i.user;
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
                                } = j;

                                let { createdAt } = j;
                                createdAt = postService.timeForToday(createdAt);

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
                                location,
                                commentCount,
                                likeCount,
                                likeState,
                                bookmarkState,
                                profileImageUrl,
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
                            await postService.nonFollowerPostList(
                                nonFolTargetId
                            );
                        for (i of nonFollowerPostList) {
                            const likes = i.Likes;
                            const likeCount = likes.length;

                            const comments = i.Comments;
                            const commentCount = comments.length;

                            const { nickname, profileImageUrl } = i.user;
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
                                } = j;

                                let { createdAt } = j;
                                createdAt = postService.timeForToday(createdAt);

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
                                location,
                                commentCount,
                                likeCount,
                                likeState,
                                bookmarkState,
                                profileImageUrl,
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
                                const { nickname, profileImageUrl } = i.user;
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
                                    } = j;

                                    let { createdAt } = j;
                                    createdAt =
                                        postService.timeForToday(createdAt);

                                    const { nickname, profileImageUrl } =
                                        j.user;
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
                                    profileImageUrl,
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
                                    '게시글 북마크 중 오류가 발생하였습니다.',
                            });
                        }
                    }
                } catch (error) {
                    console.log(error);
                    res.status(400).json({
                        result: false,
                        message: '게시글 북마크 중 오류가 발생하였습니다.',
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: false,
                message: '게시글 북마크 중 오류가 발생하였습니다.',
            });
        }
    },
};
