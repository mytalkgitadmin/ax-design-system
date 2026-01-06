export type TableColumn = {
  /** 컬럼 키 */
  key: string;

  /** 헤더 텍스트 (선택적) */
  header?: string;

  /** 컬럼 너비 */
  width?: string | number;

  /** 텍스트 정렬 */
  align?: 'left' | 'center' | 'right';

  /** 배경색 사용 (라벨 셀용) */
  bgColor?: boolean;

  /** 커스텀 렌더 함수 */
  render?: (value: unknown, row: TableRow) => React.ReactNode;
};

export type TableRow = {
  [key: string]: unknown;
};

export type TableProps = {
  /** 컬럼 설정 */
  columns: TableColumn[];

  /** 테이블 데이터 */
  data: TableRow[];

  /** 테이블 제목 (접근성) */
  caption?: string;
};
