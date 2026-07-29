import parseValue from './parse-value';

function parseColumns(value: string) {
  const parsed = parseValue(value);

  if (typeof parsed === 'object') {
    return parsed;
  }

  return { xs: 1, sm: parsed };
}

export default parseColumns;
