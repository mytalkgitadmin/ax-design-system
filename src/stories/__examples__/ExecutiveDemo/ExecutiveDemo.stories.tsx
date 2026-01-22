import { ExecutiveDemo } from './ExecutiveDemo';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * # 경영진 대상 디자인 시스템 프레젠테이션
 *
 * 이 페이지는 디자인 시스템의 효율성과 일관성을 경영진에게 시연하기 위한 데모 페이지입니다.
 *
 * ## 주요 기능
 *
 * ### 🎨 실시간 테마 전환
 * - **Default**: 기본 테마 (Pretendard 폰트)
 * - **Brand A**: Noto Sans KR (고딕체) + 각진 모서리
 * - **Brand B**: Noto Serif KR (명조체) + 둥근 모서리
 *
 * 테마를 변경하면 모든 컴포넌트가 즉시 업데이트되어 디자인 시스템의 강력함을 보여줍니다.
 *
 * ### 📦 포함된 컴포넌트
 * - **Button**: 다양한 variant, color, size
 * - **Form Elements**: Input, Textarea, Select
 * - **Selection Controls**: Radio, Checkbox
 * - **Visual Elements**: Badge, Avatar
 * - **Navigation**: Tabs, Pagination
 * - **Data Display**: Table, Accordion
 * - **Overlay**: Modal
 *
 * ### 💡 시연 포인트
 * 1. **일관성**: 모든 컴포넌트가 선택된 테마를 따릅니다
 * 2. **효율성**: 하나의 코드로 여러 브랜드를 표현할 수 있습니다
 * 3. **확장성**: 새로운 테마를 쉽게 추가할 수 있습니다
 * 4. **유지보수성**: 중앙화된 관리로 업데이트가 용이합니다
 *
 * ## 사용 방법
 * 1. 상단의 테마 선택 버튼을 클릭하여 테마를 전환하세요
 * 2. 각 컴포넌트가 어떻게 변하는지 관찰하세요
 * 3. 특히 폰트 스타일과 border-radius의 변화에 주목하세요
 */
const meta = {
  title: 'Examples/Executive Demo',
  component: ExecutiveDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '경영진을 위한 디자인 시스템 프레젠테이션 페이지입니다. 테마 전환을 통해 디자인 시스템의 효율성을 시연합니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ExecutiveDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## 디자인 시스템 시연
 *
 * 테마 전환 기능을 통해 디자인 시스템의 강력함을 체험하세요.
 *
 * **테마별 특징:**
 * - **Default**: 표준 Pretendard 폰트, 중간 정도의 둥근 모서리
 * - **Brand A**: Noto Sans KR (고딕체), 각진 모서리 (0px radius)
 * - **Brand B**: Noto Serif KR (명조체), 둥근 모서리 (12px radius)
 */
export const Demo: Story = {
  render: () => <ExecutiveDemo />,
};
