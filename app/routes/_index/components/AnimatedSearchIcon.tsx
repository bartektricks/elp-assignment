import { AnimatePresence, type AnimationProps, motion } from 'framer-motion';
import { SEARCH_FOCUS_KEY } from '~/utils/constants';

const SEARCH_ICON_ANIMATION_PROPS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} satisfies AnimationProps;

function AnimatedSearchIcon({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence initial={false}>
      <span>
        {isLoading ? (
          <motion.span
            key="loading-icon"
            data-testid="header-loading-icon"
            role="status"
            aria-hidden="true"
            className="loader-5 loader-color-dark-gray p-1"
            {...SEARCH_ICON_ANIMATION_PROPS}
          />
        ) : (
          <motion.span
            key="key-icon"
            data-testid="header-key-icon"
            role="presentation"
            className="typography-s rounded-sm border border-current px-0.5 opacity-40"
            {...SEARCH_ICON_ANIMATION_PROPS}
          >
            {SEARCH_FOCUS_KEY}
          </motion.span>
        )}
      </span>
    </AnimatePresence>
  );
}

export default AnimatedSearchIcon;
