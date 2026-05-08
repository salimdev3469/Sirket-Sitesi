import type { ReactNode, SVGProps } from 'react';

type IconName =
  | 'code'
  | 'network'
  | 'cloud'
  | 'calendar'
  | 'arrow-right'
  | 'download'
  | 'speed'
  | 'shield';

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

const iconMap: Record<IconName, ReactNode> = {
  code: (
    <>
      <path d="M8 9L4 12L8 15" />
      <path d="M16 9L20 12L16 15" />
      <path d="M14 5L10 19" />
    </>
  ),
  network: (
    <>
      <rect x="3" y="3" width="6" height="6" />
      <rect x="15" y="3" width="6" height="6" />
      <rect x="9" y="15" width="6" height="6" />
      <path d="M9 6H15" />
      <path d="M12 9V15" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18H17A4 4 0 0 0 17 10A6 6 0 0 0 5.5 11.5A3.5 3.5 0 0 0 7 18Z" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="6" width="16" height="14" rx="1.5" />
      <path d="M8 4V8" />
      <path d="M16 4V8" />
      <path d="M4 10H20" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M5 12H19" />
      <path d="M13 6L19 12L13 18" />
    </>
  ),
  download: (
    <>
      <path d="M12 4V16" />
      <path d="M7 11L12 16L17 11" />
      <path d="M5 20H19" />
    </>
  ),
  speed: (
    <>
      <path d="M4 16A8 8 0 1 1 20 16" />
      <path d="M12 12L16 8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3L19 6V12C19 16.5 16 20 12 21C8 20 5 16.5 5 12V6L12 3Z" />
      <path d="M12 8V13" />
      <path d="M12 16H12.01" />
    </>
  )
};

export function Icon({ name, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {iconMap[name]}
    </svg>
  );
}
