const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const app = express();

app.get('/get-stripe-session-id', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        success_url: req.protocol + '://' + req.get('host') + '/payment/success',
        cancel_url: req.protocol + '://' + req.get('host') + '/payment/cancel',
        payment_method_types: ['card'],
        line_items: [
            {
                name: 'test product',
                amount: 50,
                currency: 'USD',
                quantity: 1,
            }
        ]
    });
    res.send(session.id);
});

app.get('/payment/success', (req, res) => {
    res.send('The payment is successful');
});

app.get('/payment/cancel', (req, res) => {
    res.send('The payment is canceled');
});

app.listen(process.env.SERVER_PORT || 5000, () => console.log('The server listening...'))
