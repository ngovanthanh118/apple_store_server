const Product = require('../models/productSchema');

class SearchController {
    async findProductByName(req, res) {
        try {
            const queryName = req.query.q;
            const products = await Product.find({});
            const filterProductsByName = products.filter(product =>
                product.name
                    .toLowerCase()
                    .replace(' ', '')
                    .includes(queryName
                        .toLowerCase()
                        .replace(' ', '')
                    ))
            if (filterProductsByName.length > 0) {
                res.status(200).send({ error: false, data: filterProductsByName })
            } else {
                res.status(200).send({ error: true, msg: `Không tìm thấy sản phẩm với tên ${queryName}` })
            }
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
}
module.exports = new SearchController();