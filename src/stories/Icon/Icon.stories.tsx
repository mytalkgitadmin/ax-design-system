import type { Meta, StoryObj } from "@storybook/react";
import Icon from "./index";
import type { IconType } from "./types";

/**
 * Icon 컴포넌트는 Tabler 아이콘을 사용하는 아이콘 컴포넌트입니다.
 *
 * ## 주요 기능
 * - SVG 기반의 아이콘 시스템
 * - 크기 조절이 자유로움
 * - 색상 커스터마이징 가능
 * - 접근성 고려
 *
 * ## 사용법
 * ```tsx
 * import Icon from './Icon';
 *
 * function MyComponent() {
 *   return (
 *     <>
 *       // 기본 사용
 *       <Icon name="tabler:heart" />
 *
 *       // 크기 변경
 *       <Icon name="tabler:heart" size={24} />
 *
 *       // 색상 변경
 *       <Icon name="tabler:heart" color="#FF0000" />
 *     </>
 *   );
 * }
 * ```
 */
const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: [
        "tabler:check",
        "tabler:x",
        "tabler:plus",
        "tabler:minus",
        "tabler:arrow-right",
        "tabler:arrow-left",
        "tabler:search",
        "tabler:settings",
        "tabler:user",
        "tabler:home",
        "tabler:menu",
        "tabler:dots",
        "tabler:edit",
        "tabler:trash",
        "tabler:download",
        "tabler:upload",
      ],
    },
    size: {
      control: { type: "number", min: 12, max: 64, step: 4 },
    },
    color: {
      control: "color",
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "tabler:check",
    size: 20,
  },
};

export const Sizes: Story = {
  args: {
    name: "tabler:check",
  },
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <Icon name="tabler:check" size={16} />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>16px</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="tabler:check" size={20} />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>20px</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="tabler:check" size={24} />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>24px</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="tabler:check" size={32} />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>32px</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="tabler:check" size={48} />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>48px</p>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  args: {
    name: "tabler:check",
  },
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <Icon name="tabler:check" size={32} color="#007bff" />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>Primary</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="tabler:check" size={32} color="#28a745" />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>Success</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="tabler:check" size={32} color="#dc3545" />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>Danger</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="tabler:check" size={32} color="#ffc107" />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>Warning</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="tabler:check" size={32} color="#6c757d" />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>Gray</p>
      </div>
    </div>
  ),
};

export const AllIcons: Story = {
  args: {
    name: "tabler:check",
  },
  render: () => {
    const icons: IconType[] = [
      "tabler:check",
      "tabler:x",
      "tabler:plus",
      "tabler:minus",
      "tabler:arrow-right",
      "tabler:arrow-left",
      "tabler:search",
      "tabler:settings",
      "tabler:user",
      "tabler:home",
      "tabler:menu",
      "tabler:dots",
      "tabler:edit",
      "tabler:trash",
      "tabler:download",
      "tabler:upload",
    ];

    const handleCopy = (iconName: IconType) => {
      const code = `<Icon name="${iconName}" />`;
      navigator.clipboard.writeText(code);
    };

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "16px",
          maxWidth: "800px",
        }}
      >
        {icons.map((icon) => (
          <button
            key={icon}
            onClick={() => handleCopy(icon)}
            style={{
              background: "none",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "16px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#007bff";
              e.currentTarget.style.backgroundColor = "#f8f9fa";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e0e0e0";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <Icon name={icon} size={32} />
            <p
              style={{
                fontSize: "11px",
                margin: 0,
                color: "#6c757d",
                wordBreak: "break-all",
              }}
            >
              {icon.replace("tabler:", "")}
            </p>
          </button>
        ))}
      </div>
    );
  },
};
