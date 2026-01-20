import { FC, ReactNode } from 'react';

import clsx from 'clsx';
import {
  Alert01Icon,
  Alert02Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
} from 'hugeicons-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger' | 'note';

const variantStyles: Record<
  AlertVariant,
  {
    container: string;
    icon: string;
    defaultIcon: FC<Record<string, string | number>>;
  }
> = {
  info: {
    container: 'bg-blue-50 border-blue-100 text-blue-900',
    icon: 'text-blue-600',
    defaultIcon: InformationCircleIcon,
  },
  success: {
    container: 'bg-emerald-50 border-emerald-100 text-emerald-900',
    icon: 'text-emerald-600',
    defaultIcon: CheckmarkCircle02Icon,
  },
  warning: {
    container: 'bg-amber-50 border-amber-100 text-amber-900',
    icon: 'text-amber-600',
    defaultIcon: Alert02Icon,
  },
  danger: {
    container: 'bg-red-50 border-red-100 text-red-900',
    icon: 'text-red-600',
    defaultIcon: Alert01Icon,
  },
  note: {
    container: 'bg-slate-50 border-slate-200 text-slate-700',
    icon: 'text-slate-500',
    defaultIcon: InformationCircleIcon,
  },
};

export type AlertProps = {
  title?: string;
  children: ReactNode;
  variant?: AlertVariant;
  className?: string;
  icon?: ReactNode;
};

export const Alert: FC<AlertProps> = ({
  title,
  children,
  variant = 'note',
  className,
  icon,
}) => {
  const styles = variantStyles[variant];
  const IconComponent = styles.defaultIcon;

  const renderedIcon =
    icon === false ? null : icon ? (
      icon
    ) : (
      <IconComponent size={20} className={styles.icon} variant="bulk" />
    );

  return (
    <div
      className={clsx(
        'relative flex gap-3 rounded-lg border p-4 text-sm',
        styles.container,
        className,
      )}
    >
      {renderedIcon && <div className="shrink-0 mt-0.5">{renderedIcon}</div>}
      <div className="flex-1 space-y-1">
        {title && <h5 className="font-bold leading-none">{title}</h5>}
        <div className="leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  );
};
