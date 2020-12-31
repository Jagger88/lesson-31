import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'; // this will help with the API calls

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51I3P56DEAitCh4uVvAikHqjueZ6abrlwD7WW0a49HdKKv8xfUPsvqa4sEny1HGuCio3R97nlRpArk3YJxKiDcLwL000oM9tfYl';

  // this is the token that we pass to the stripe checkout node /payment route.
  const onToken = token => {
    // using axios for API call... url is relative so axios knows tht this is an internal call.
    // you could use the native fetch but that may be more difficult
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token: token
      }
    })
      .then(response => {
        alert('succesful payment');
      })
      .catch(error => {
        console.log('Payment Error: ', error);
        alert(
          'There was an issue with your payment! Please make sure you use the provided credit card.'
        );
      });
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CA Test'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
