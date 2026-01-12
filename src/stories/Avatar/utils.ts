export const getColorVariantFromText = (
  text: string
): 'blue' | 'green' | 'red' | 'yellow' | 'indigo' | 'pink' | 'gray' => {
  const colors = [
    'blue',
    'green',
    'red',
    'yellow',
    'indigo',
    'pink',
    'gray',
  ] as const;

  // 빈 문자열 처리
  if (!text) return 'gray';

  // 간단한 해시 함수 (문자열을 숫자로 변환)
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  // 해시 값을 색상 배열 인덱스로 변환
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export const getInitials = (name: string): string => {
  const trimmed = name.trim();
  if (!trimmed) return '';

  // 한글인 경우 첫 2글자, 영문인 경우 첫 1-2글자
  const words = trimmed.split(' ');
  if (words.length > 1) {
    // 여러 단어인 경우 각 단어의 첫 글자
    return words
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  }
  // 한 단어인 경우 첫 2글자
  return trimmed.slice(0, 2);
};
