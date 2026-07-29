function parseValue(value: any) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return undefined;
  }
}

export default parseValue;
