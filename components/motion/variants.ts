// Common animation variants used throughout the site
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const pulse = {
  scale: [1, 1.03, 1],
  transition: { repeat: Infinity, duration: 2 }
};

export const glow = {
  boxShadow: [
    "0 0 0 rgba(247, 147, 26, 0)",
    "0 0 15px rgba(247, 147, 26, 0.5)",
    "0 0 0 rgba(247, 147, 26, 0)"
  ],
  transition: { repeat: Infinity, duration: 3 }
};

export const gradientMotion = {
  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  transition: { repeat: Infinity, duration: 8, ease: "linear" }
};
