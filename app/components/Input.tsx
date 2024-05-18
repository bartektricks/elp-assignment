import clsx from 'clsx';
import { type ForwardedRef, forwardRef } from 'react';

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className'
> & {
  icon?: React.ReactNode;
};

const Input = forwardRef(function Input(
  { icon, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <div className="relative text-light-gray-3">
      <input
        ref={ref}
        {...props}
        className={clsx(
          'typography-m rounded-md border border-current bg-transparent py-1.5 transition-all disabled:opacity-30',
          icon ? 'pr-8 pl-4' : 'px-4',
        )}
      />
      {icon && (
        <span
          data-testid="input-icon"
          className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3"
        >
          {icon}
        </span>
      )}
    </div>
  );
});

export default Input;
