export const CATEGORIES = [
  { value: 'all', label: 'Все' },
  { value: 'kitchen', label: 'Кухня' },
  { value: 'bar', label: 'Бар' },
  { value: 'dessert', label: 'Десерты' },
];

export const REASONS = [
  { value: 'out_of_stock', label: 'Закончились продукты' },
  { value: 'bad_quality', label: 'Плохое качество партии' },
  { value: 'no_cook', label: 'Нет повара на станции' },
  { value: 'other', label: 'Другое' },
];

export const getCategoryLabel = (value) =>
  CATEGORIES.find((c) => c.value === value)?.label ?? value;

export const getReasonLabel = (value) =>
  REASONS.find((r) => r.value === value)?.label ?? value;

export const formatPrice = (price) => `${price.toLocaleString('ru-RU')} ₽`;