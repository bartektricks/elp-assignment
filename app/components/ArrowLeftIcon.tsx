export type ArrowLeftIcon = Pick<React.SVGAttributes<SVGSVGElement>, 'rotate'>;

export default function ArrowLeftIcon({ rotate }: ArrowLeftIcon) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform={rotate ? `rotate(${rotate})` : undefined}
    >
      <title>Arrow</title>
      <path
        d="M10 4L6 8L10 12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
