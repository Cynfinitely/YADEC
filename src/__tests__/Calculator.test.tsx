import { calculateSurcharge, calculateDistanceFee, applyFridayRush, calculateDeliveryFee } from '../utils/calculatorHelpers';

describe('Calculator', () => {
  test('calculateSurcharge correctly calculates the surcharge', () => {
    expect(calculateSurcharge(8.90, 4)).toBe(1.10);
    expect(calculateSurcharge(10, 5)).toBe(0.50);
    expect(calculateSurcharge(200, 10)).toBe(3);
    expect(calculateSurcharge(8.90, 13)).toBe(6.80);
    expect(calculateSurcharge(8.90, 14)).toBe(7.30);
  });

  test('calculateDistanceFee correctly calculates the distance fee', () => {
    expect(calculateDistanceFee(1499)).toBe(3);
    expect(calculateDistanceFee(1500)).toBe(3);
    expect(calculateDistanceFee(1501)).toBe(4);
  });

  test('applyFridayRush correctly applies the Friday rush fee', () => {
    const nonRushHour = new Date('2022-01-07T14:00:00Z'); // Friday 2 PM UTC
    const rushHour = new Date('2022-01-07T16:00:00Z'); // Friday 4 PM UTC
    expect(applyFridayRush(10, nonRushHour)).toBe(10);
    expect(applyFridayRush(10, rushHour)).toBe(12);
  });

  test('calculateDeliveryFee correctly calculates the delivery fee', () => {
    expect(calculateDeliveryFee('8.90', '1499', '4', '2022-01-07T14:00:00Z')).toBe(4.10);
    expect(calculateDeliveryFee('10', '1500', '5', '2022-01-07T16:00:00Z')).toBe(4.20);
    expect(calculateDeliveryFee('200', '1501', '10', '2022-01-07T16:00:00Z')).toBe(0);
    expect(calculateDeliveryFee('8.90', '1501', '13', '2022-01-07T16:00:00Z')).toBe(12.96);
    expect(calculateDeliveryFee('8.90', '1501', '14', '2022-01-07T16:00:00Z')).toBe(13.56);
  });
});