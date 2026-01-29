import type { ThemeOption } from '../../types';

type ThemeSwitcherProps = {
  selectedTheme: ThemeOption;
  onThemeChange: (theme: ThemeOption) => void;
};

const THEME_LABELS: Record<ThemeOption, string> = {
  default: 'type A',
  brandA: 'type B',
  brandB: 'type C',
};

const THEME_OPTIONS: ThemeOption[] = ['default', 'brandA', 'brandB'];

/**
 * ThemeSwitcher
 * 테마 전환 버튼 컴포넌트
 */
export const ThemeSwitcher = ({
  selectedTheme,
  onThemeChange,
}: ThemeSwitcherProps) => {
  return (
    <>
      {THEME_OPTIONS.map((theme) => (
        <button
          key={theme}
          onClick={() => onThemeChange(theme)}
          style={
            selectedTheme === theme
              ? {
                  background: '#000',
                  color: '#fff',
                  padding: '4px 8px',
                }
              : { padding: '4px 8px' }
          }
        >
          {THEME_LABELS[theme]}
        </button>
      ))}
    </>
  );
};
