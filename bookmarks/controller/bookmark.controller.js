const bookmarkService = require('../service/bookmark.service');

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
                res.status(201).json({ result: true, bookmarkstate: false });
            } else {
                await bookmarkService.MarkPost(postId, userId);
                res.status(201).json({ result: true, bookmarkstate: true });
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
