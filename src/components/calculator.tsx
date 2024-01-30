import { Formik, Form} from 'formik';
import { useEffect, useState } from 'react';
import { calculateDeliveryFee } from '../utils/calculatorHelpers';
import { calculatorSchema } from '@/schemas/validationSchemas';
import CalculatorField from './CalculatorField';
import { useCallback } from 'react';
import { FormikHelpers } from 'formik';

export default function Calculator() {
    const [deliveryFee, setDeliveryFee] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    interface Values {
        cartValue: string;
        deliveryDistance: string;
        amountOfItems: string;
        time: string;
      }

    // Accessibility: Focus the close button when the modal is opened, and focus the submit button when the modal is closed
    useEffect(() => {
        if (showModal) {
          document.getElementById('close-modal-button')?.focus();
        } else {
          document.getElementById('submit-button')?.focus();
        }
      }, [showModal]);

      const onSubmit = useCallback((values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        const fee = calculateDeliveryFee(values.cartValue, values.deliveryDistance, values.amountOfItems, values.time);
        setDeliveryFee(fee.toFixed(2));
        setShowModal(true);
        setSubmitting(false);
      }, []);

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <Formik
        initialValues={{
          cartValue: '',
          deliveryDistance: '',
          amountOfItems: '',
          time: '',
        }}
        validationSchema={calculatorSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className="p-6 bg-white rounded shadow-md w-full max-w-md">
            <CalculatorField name="cartValue" type="number" label="Cart Value" />
            <CalculatorField name="deliveryDistance" type="number" label="Delivery Distance" />
            <CalculatorField name="amountOfItems" type="number" label="Amount of Items" />
            <CalculatorField name="time" type="date" label="Time" />
            <div className="flex items-center justify-between">
            <button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" id="submit-button">
                Calculate Delivery Price
            </button>
            </div>
            <div className="mt-4 bg-gray-200 p-4 rounded">
              <p>Cart Value: {values.cartValue || 0} €</p>
              <p>Delivery Distance: {values.deliveryDistance || 0} m</p>
              <p>Amount of Items: {values.amountOfItems || 0}</p>
              <p>Time: {values.time || "-"}</p>
            </div>
          </Form>
        )}
      </Formik>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Delivery Fee
                    </h3>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                        {deliveryFee}€
                        </p>
                    </div>
                    </div>
                </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setShowModal(false)} id="close-modal-button">
                    Close
                </button>
                </div>
            </div>
            </div>
        </div>
        )}
    </div>
  );
}