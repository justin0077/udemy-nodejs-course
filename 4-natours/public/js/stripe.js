import axios from 'axios';
import { showAlert } from './alerts';
const Stripe = require('stripe');

/* eslint-disable */

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_IVWJ6Y2CgRauU5eNTewQTFns'
  );
  try {
    // 1. Get checkout session from the API
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
