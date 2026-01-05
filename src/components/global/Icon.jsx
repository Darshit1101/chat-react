const Icon = ({
  // eslint-disable-next-line no-unused-vars
  icon: IconComponent,
  size = 20,
  strokeWidth = 1.7,
  ...props
}) => {
  return <IconComponent size={size} strokeWidth={strokeWidth} {...props} />;
};

export default Icon;
