import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { SvgIconComponent } from '@mui/icons-material';


interface BreadcrumbItem {
  title: string;
  href?: string;
  icon: SvgIconComponent;
}

interface DynamicIconBreadcrumbsProps {
  breadcrumbs: BreadcrumbItem[];
}

const DynamicIconBreadcrumbs: React.FC<DynamicIconBreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <div role="presentation">
      <Breadcrumbs maxItems={2} aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return isLast ? (
            <Typography
              key={index}
              sx={{ display: 'flex', alignItems: 'center', color: 'text.primary', fontSize: '1rem' }}
            >
              <breadcrumb.icon sx={{ mr: 0.5 }} fontSize="inherit" />
              {breadcrumb.title}
            </Typography>
          ) : (
            <Link
              key={index}
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center', fontSize: '1rem' }}
              color="inherit"
              href={breadcrumb.href}
            >
              <breadcrumb.icon sx={{ mr: 0.5 }} fontSize="inherit" />
              {breadcrumb.title}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default DynamicIconBreadcrumbs;
