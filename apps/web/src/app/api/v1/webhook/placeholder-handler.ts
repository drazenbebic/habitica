const placeholderHandler = ({
  event,
  action,
}: {
  event: string;
  action: string;
}) => {
  console.warn(`[${event}.${action}]: 🚧 Under Construction 🚧`);
};

export default placeholderHandler;
