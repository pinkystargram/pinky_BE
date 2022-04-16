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

    list: async (req, res) => {
        // const { userId } = res.locals.user;
        const userId = '3d5ae106-1c0b-4ea0-8df1-0fb7229c07c0';

        try {
            // const followerUserIdList = await postService.followerList(userId);
            // console.log(followerUserIdList, 'followerUserIdList');
            // const followerPosts = await postService.followerPostList(userId);
            // console.log(followerPosts, 'followerPosts');
            // const nonFollowerPosts = await postService.nonFollowerPostList(
            //     followerUserIdList
            // );
            // console.log(nonFollowerPosts, 'nonFollowerPosts');
            const user = await postService.postUserList();
            let arr = [];
            for (i of user) {
                arr.push(i.user);
            }
            const postList = await postService.postList();
            let arr2 = [];
            for (i of postList) {
                arr2.push(i);
            }
            let arr3 = [];
            let arr4 = [];
            // function merge(...arr) {
            //     return arr.reduce((acc, val) => {
            //         return { ...acc, ...val };
            //     }, {});
            // }

            // function merge_options(obj1, obj2) {
            //     let obj3 = {};
            //     for (let key in obj1) {
            //         obj3[key] = obj1[key];
            //     }
            //     for (let key in obj2) {
            //         obj3[key] = obj2[key];
            //     }
            //     return obj3;
            // }
            console.log(postList);
            for (let i = 0; i < postList.length; i++) {
                arr3.push(user[i].user);
                let a = postList[i].Comments.length;
                let b = {
                    commentCount: `${a}`,
                    likeCount: '0',
                    likeList: [],
                    bookmarkList: [],
                };
                arr3.push(b);
                arr3.push(postList[i]);

                // let nickname = user[i].user;
                // let b = postList[i];

                // let obj3 = {};
                // for (let key in nickname) {
                //     obj3[key] = nickname[key];
                //     console.log(obj3);
                // }
                // for (let key in b) {
                //     obj3[key] = b[key];
                // }
                // arr4.push(obj3);
                // let newObj = Object.assign({}, { a }, { b });
                // arr4.push(newObj);
                // let newObj = merge(user[i].user, postList[i]);
                // arr4.push(newObj);
                // let newObj = merge_options(a, b);
                // console.log(newObj);
                // arr4.push(newObj);
                // let newObj = { ...nickname, ...b };
                // console.log(newObj);
                // arr4.push(a);
            }
            const data = arr3;
            console.log(data);
            res.status(201).json({ result: true, data });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: false,
                message: '게시글 조회 중 오류가 발생하였습니다.',
            });
        }
    },
};
