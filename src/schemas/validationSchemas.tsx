import * as Yup from 'yup';

export const calculatorSchema = Yup.object({
    cartValue: Yup.number().typeError('Cart value must be a number').required('Required').positive("Cart Value Must Be Positive"),
    deliveryDistance: Yup.number().typeError('Delivery distance must be a number').required('Required').positive("Distance Must Be Positive"),
    amountOfItems: Yup.number().typeError('Number of items must be a number').required('Required').positive("Amount of Items Must Be Positive"),
    time: Yup.date().typeError('Order time must be a valid date').required('Required'),
});