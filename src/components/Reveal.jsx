import { forwardRef } from "react";
import useReveal from "../hooks/useReveal";

function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((r) => {
      if (!r) return;
      if (typeof r === "function") r(node);
      else r.current = node;
    });
  };
}

/**
 * Scroll-entrance wrapper. variant picks a sensible default motion;
 * y/x/scale/rotateX/duration/delay can still be set individually to
 * override it. Forwards refs so it can compose with hooks like useTilt.
 */
const VARIANTS = {
  up: { y: 24, scale: 1, rotateX: 0 },
  scale: { y: 16, scale: 0.94, rotateX: 0 },
  tilt: { y: 30, scale: 0.97, rotateX: -8 },
};

const Reveal = forwardRef(function Reveal(
  {
    as: Tag = "div",
    variant = "up",
    y,
    x = 0,
    scale,
    rotateX,
    delay = 0,
    duration,
    once = true,
    style,
    children,
    ...rest
  },
  forwardedRef
) {
  const v = VARIANTS[variant] || VARIANTS.up;
  const { ref } = useReveal({
    y: y ?? v.y,
    x,
    scale: scale ?? v.scale,
    rotateX: rotateX ?? v.rotateX,
    delay,
    duration: duration ?? (variant === "tilt" ? 1.05 : 0.9),
    once,
  });
  return (
    <Tag ref={mergeRefs(ref, forwardedRef)} style={style} {...rest}>
      {children}
    </Tag>
  );
});

export default Reveal;
