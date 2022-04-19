const searchService = require('../service/search.service');

module.exports = {
    search: async (req, res) => {
        try {
            const { searchText } = req.body;
            const data = await searchService.searchUser(searchText);
            console.log(data);
            res.status(201).json({ result: true, data });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                result: false,
                message: '유저 검색중 오류가 발생했습니다.',
            });
        }
    },
};
