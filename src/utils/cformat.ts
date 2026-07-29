function cformat(amount: number, options: Intl.NumberFormatOptions = {}) {
  if (amount === undefined) {
    return undefined;
  }

  options.currency = options.currency || 'NGN';

  return new Intl.NumberFormat('en-US', {
    ...options,
    style: 'currency',
  }).format(amount);
  // .replace('NGN', options.currency === null ? '' : '₦');
}

export default cformat;
