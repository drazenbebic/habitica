import { Metadata } from 'next';

type Params = {
  description: string;
  path: string;
  suffix?: string;
  title: string;
};

export const generatePageMetadata = ({
  description,
  path = '',
  suffix = 'Octogriffin',
  title,
}: Params): Metadata => {
  const imageUrl = 'https://octogriffin.com/og-image.png';

  return {
    title,
    description,
    openGraph: {
      title: `${title} - ${suffix}`,
      description,
      url: `https://octogriffin.com/${path}`,
      siteName: 'Octogriffin',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Octogriffin logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - ${suffix}`,
      description,
      images: [imageUrl],
    },
  };
};
