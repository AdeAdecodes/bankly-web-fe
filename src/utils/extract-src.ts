import { ImageProps } from 'next/image';

function extractSrc(entry: ImageProps['src']) {
  if (!entry || typeof entry !== 'object') {
    return entry || '';
  }

  if ('src' in entry) {
    return entry.src;
  }

  if ('default' in entry) {
    return entry.default.src;
  }

  return '';
}

export default extractSrc;
