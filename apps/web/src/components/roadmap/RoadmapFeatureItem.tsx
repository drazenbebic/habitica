import { FC } from 'react';

import { Badge } from '@/components/ui/Badge';
import { Content } from '@/components/ui/Content';
import { Heading } from '@/components/ui/Heading';

export type RoadmapFeatureItemProps = {
  title: string;
  description: string;
  tags?: string[];
};

export const RoadmapFeatureItem: FC<RoadmapFeatureItemProps> = ({
  title,
  description,
  tags = [],
}) => {
  return (
    <div className="relative pl-8">
      <div className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-slate-100 bg-white"></div>

      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        <Heading level={4} size="base" className="font-semibold text-slate-900">
          {title}
        </Heading>
        {tags.map(tag => (
          <Badge key={tag} variant="success">
            {tag}
          </Badge>
        ))}
      </div>
      <Content size="sm" className="leading-relaxed text-slate-500">
        {description}
      </Content>
    </div>
  );
};
