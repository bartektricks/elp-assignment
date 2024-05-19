import clsx from 'clsx';
import { format } from 'date-fns';

type ContributionGridProps = {
  totalContributions: number;
  colors: (string | undefined)[];
  contributionDays: {
    date: string;
    color?: string;
    contributionCount: number;
  }[];
};

export default function ContributionGrid({
  colors,
  totalContributions,
  contributionDays,
}: ContributionGridProps) {
  return (
    <div className="inline-grid text-left text-darkest-gray">
      <h3>
        {totalContributions.toLocaleString()} contributions in the last year
      </h3>
      <div className="my-2 grid auto-cols-max grid-flow-col overflow-x-auto grid-rows-7 justify-center gap-1">
        {contributionDays.map(({ date, color, contributionCount }) => (
          <Block
            key={date}
            color={color}
            tooltipContent={`${contributionCount.toLocaleString()} contributions on ${format(
              date,
              'MMM do',
            )}.`}
          />
        ))}
      </div>
      <div className="typography-xxs ml-auto inline-flex items-center gap-1">
        Less
        {[undefined, ...colors].map((color) => (
          <Block key={color ?? 'no-color'} color={color} />
        ))}
        More
      </div>
    </div>
  );
}

function Block({
  color,
  tooltipContent,
}: { color?: string; tooltipContent?: string }) {
  const classes = clsx(
    'relative size-2.5 cursor-pointer overflow-hidden rounded-sm bg-light-gray-2',
    {
      'typography-xxs text-nowrap before:pointer-events-none before:absolute before:right-1/2 before:bottom-full-1 before:z-50 before:block before:translate-x-1/2 before:rounded-md before:bg-light-gray-2 before:p-2 before:text-dark-gray-2 before:opacity-0 focus:before:opacity-100 hover:before:opacity-100 before:transition-all before:duration-150 before:content-data-tooltip':
        tooltipContent,
    },
  );
  return (
    <div
      role="presentation"
      style={{ backgroundColor: color }}
      data-tooltip={tooltipContent}
      className={classes}
    />
  );
}
