const placeholder = async ({
  event,
  action,
}: {
  event: string;
  action: string;
}) => {
  console.log(`🚧 TODO: ${event}.${action} handler.`);
};

export default placeholder;
