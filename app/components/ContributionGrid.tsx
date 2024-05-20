import * as Tooltip from '@radix-ui/react-tooltip';
import { format } from 'date-fns';
import { forwardRef } from 'react';

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
      <Tooltip.Provider>
        <div className="my-2 grid auto-cols-max grid-flow-col grid-rows-7 justify-center gap-1 overflow-x-auto">
          {contributionDays.map(({ date, color, contributionCount }) => (
            <Tooltip.Root key={date} delayDuration={0} disableHoverableContent>
              <Tooltip.Trigger asChild>
                <Block color={color} />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  sideOffset={4}
                  hideWhenDetached
                  className="typography-xxs rounded-md bg-darkest-gray px-3 py-2 text-light-gray-2"
                >
                  {contributionCount.toLocaleString()} contributions on{' '}
                  {format(date, 'MMM do')}.
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          ))}
        </div>
      </Tooltip.Provider>
      <div className="typography-xxs ml-auto inline-flex items-center gap-1">
        Less
        <Block />
        {colors.map((color) => (
          <Block key={color} color={color} />
        ))}
        More
      </div>
    </div>
  );
}

const Block = forwardRef<
  HTMLDivElement,
  {
    color?: string;
  } & Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>
>(({ color, style, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="presentation"
      style={{ ...(style ?? {}), backgroundColor: color }}
      className="size-2.5 cursor-pointer overflow-hidden rounded-sm bg-light-gray-2"
      {...props}
    />
  );
});
