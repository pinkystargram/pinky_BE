const likeService = require('../service/like.service');

module.exports = {
    like: async (req, res) => {
        try {
            const { postId } = req.params;
            const { userId } = res.locals;
            const confirmLike = await likeService.findLike(postId, userId);
            if (confirmLike !== null) {
                await likeService.disLikePost(postId, userId);
                return res.status(201).json({ result: true, likestate: false });
            } else {
                await likeService.likePost(postId, userId);
                return res.status(201).json({ result: true, likestate: true });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: false,
                message: '게시글 좋아요 중 오류가 발생하였습니다.',
            });
        }
    },
};
