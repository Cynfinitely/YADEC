export const calculateSurcharge = (cartValue: number, amountOfItems: number) => {
    if (cartValue <= 0 || amountOfItems <= 0) {
        throw new Error('cartValue and amountOfItems must be positive');
      }

    let surcharge = 0;
    if (cartValue < 10) {
      surcharge += 10 - cartValue;
    }
    if (amountOfItems >= 5) {
      surcharge += (amountOfItems - 4) * 0.5;
    }
    if (amountOfItems > 12) {
      surcharge += 1.2;
    }
    return parseFloat(surcharge.toFixed(2));
  };
  
  export const calculateDistanceFee = (deliveryDistance: number) => {
    if (deliveryDistance <= 0) {
        throw new Error('deliveryDistance must be positive');
      }

    let distanceFee = 2;
    if (deliveryDistance > 1000) {
      distanceFee += Math.ceil((deliveryDistance - 1000) / 500);
    }
    return distanceFee;
  };
  
  export const applyFridayRush = (fee: number, time: Date) => {
    if (time.getUTCDay() === 5 && time.getUTCHours() >= 15 && time.getUTCHours() < 19) {
      fee *= 1.2;
    }
    return parseFloat(fee.toFixed(2));
  };
  
  export const calculateDeliveryFee = (cartValue: string, deliveryDistance: string, amountOfItems: string, time: string): number  => {
    const valuesCartValue = parseFloat(cartValue);
    const valuesDeliveryDistance = parseFloat(deliveryDistance);
    const valuesAmountOfItems = parseInt(amountOfItems, 10);
    const valuesTime = new Date(time);

    if (valuesCartValue <= 0 || valuesDeliveryDistance <= 0 || valuesAmountOfItems <= 0) {
        throw new Error('cartValue, deliveryDistance, and amountOfItems must be positive');
      }

  
    let fee = calculateSurcharge(valuesCartValue, valuesAmountOfItems);
    fee += calculateDistanceFee(valuesDeliveryDistance);
    fee = applyFridayRush(fee, valuesTime);
    fee = Math.min(fee, 15);
  
    if (valuesCartValue >= 200) {
      fee = 0;
    }
  
    return parseFloat(fee.toFixed(2));
  };