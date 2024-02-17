import { RegistryPackagePublishedEvent } from '@octokit/webhooks-types';

const registryPackageHandler = (
  deliveryUuid: string,
  hookId: string,
  event: RegistryPackagePublishedEvent,
) => {
  console.log('🚧 TODO: registry_package handler.');
};

export default registryPackageHandler;
