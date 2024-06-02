const dotenv = require('dotenv');
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRECT_KEY);
class CheckoutController {
    async checkoutWithStripe(req, res) {
        try {
            const lineItems = req.body.products.map(product => ({
                price_data: {
                    currency: 'vnd',
                    product_data: {
                        name: product.name,
                        images: [product.image]
                    },
                    unit_amount: product.price * product.quantity,
                },
                quantity: product.quantity,
            }))
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment",
                success_url: "http://localhost:3100/",
                cancel_url: "http://localhost:3100/"
            })
            res.json({
                id: session.id
            })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
}
module.exports = new CheckoutController();