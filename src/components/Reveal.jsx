import useReveal from "../hooks/useReveal";

export default function Reveal({ as: Tag = "div", y = 24, delay = 0, style, children, ...rest }) {
  const { ref, style: revealStyle } = useReveal({ y, delay });
  return (
    <Tag ref={ref} style={{ ...revealStyle, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
