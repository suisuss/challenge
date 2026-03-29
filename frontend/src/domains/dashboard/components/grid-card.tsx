import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

type GridCardType = {
  heading: string;
  total: number;
};

export const GridCard: React.FC<GridCardType> = ({ heading, total }) => {
  return (
    <Card>
      <CardContent>
        <Typography component='div' color='text.secondary' gutterBottom>
          {heading}
        </Typography>
        <Typography variant='h6' gutterBottom>
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
};
