const placeholderHandler = ({
  event,
  action,
}: {
  event: string;
  action: string;
}) => {
  console.log(`[${event}.${action}]: 🚧 Under Construction 🚧`);
};

export default placeholderHandler;
