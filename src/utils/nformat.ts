function nformat(number: number, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat('en-US', {
    ...options,
    style: 'decimal',
  }).format(number);
}

export default nformat;
