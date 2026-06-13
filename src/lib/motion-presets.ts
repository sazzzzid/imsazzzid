export const editorialEase = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number,
];

export const smoothEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const instantTransition = { duration: 0 };

export const viewportDefault = { once: true, margin: "-80px" } as const;

export const viewportTight = { once: true, margin: "-40px" } as const;

export const staggerDelay = 0.08;

export const springSnappy = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
};

export const springSmooth = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
};

export function motionFadeUp(
  reducedMotion: boolean,
  options?: { delay?: number; y?: number; duration?: number },
) {
  if (reducedMotion) {
    return {
      initial: false as const,
      animate: undefined,
      transition: instantTransition,
    };
  }

  return {
    initial: { opacity: 0, y: options?.y ?? 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: options?.duration ?? 0.6,
      delay: options?.delay ?? 0,
      ease: editorialEase,
    },
  };
}

export function motionWhileInView(reducedMotion: boolean) {
  if (reducedMotion) {
    return {
      initial: false as const,
      whileInView: undefined,
      viewport: undefined,
    };
  }

  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewportDefault,
  };
}

export function motionBlurReveal(
  reducedMotion: boolean,
  options?: {
    delay?: number;
    y?: number;
    duration?: number;
    blur?: number;
    scale?: number;
  },
) {
  if (reducedMotion) {
    return { initial: false as const, whileInView: undefined, viewport: undefined };
  }

  const blur = options?.blur ?? 12;
  const scale = options?.scale ?? 0.98;

  return {
    initial: {
      opacity: 0,
      y: options?.y ?? 32,
      filter: `blur(${blur}px)`,
      scale,
    },
    whileInView: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
    },
    viewport: viewportDefault,
    transition: {
      duration: options?.duration ?? 0.8,
      delay: options?.delay ?? 0,
      ease: smoothEase,
    },
  };
}

export function motionScaleIn(
  reducedMotion: boolean,
  options?: { delay?: number; duration?: number },
) {
  if (reducedMotion) {
    return { initial: false as const, whileInView: undefined, viewport: undefined };
  }

  return {
    initial: { opacity: 0, scale: 0.92 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: viewportDefault,
    transition: {
      duration: options?.duration ?? 0.6,
      delay: options?.delay ?? 0,
      ease: editorialEase,
    },
  };
}

export const staggerContainer = (reducedMotion: boolean, delay = 0) =>
  reducedMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: viewportDefault,
        transition: { delayChildren: delay, staggerChildren: staggerDelay },
      };

export const staggerItem = (reducedMotion: boolean) =>
  reducedMotion
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.7, ease: smoothEase },
          },
        },
      };

export const pageEnter = (reducedMotion: boolean) =>
  reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16, filter: "blur(10px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: { duration: 0.55, ease: smoothEase },
      };
