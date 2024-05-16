import clsx from 'clsx';

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className'
> & {
  isLoading: boolean;
};

export default function Input({ isLoading, ...props }: InputProps) {
  return (
    <div className="relative">
      <input
        className="typography-m rounded-md border border-current bg-transparent px-4 py-1.5 text-light-gray-3 disabled:pointer-events-none disabled:opacity-30"
        {...props}
      />
      <span
        role="status"
        aria-hidden="true"
        className={clsx(
          'before:loader-5 before:loader-color-dark-gray -translate-y-1/2 absolute top-1/2 right-3 before:p-1 before:opacity-0',
          {
            'before:opacity-100': isLoading,
          },
        )}
      />
    </div>
  );
}
