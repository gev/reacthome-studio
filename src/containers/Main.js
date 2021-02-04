
import React from 'react';
import { Grid, GridCell } from '@rmwc/grid';
import { Typography } from '@rmwc/typography';
import { Daemons, Projects } from '../containers';

export default () => (
  <Grid>
    <GridCell span={6}>
      <div>
        <img src="./assets/logo.svg" alt="logo" width={200} />
      </div>
      <div>
        <Typography use="headline2">Hommyn<br />Studio</Typography>
      </div>
    </GridCell>
    <GridCell span={3}>
      <Projects />
    </GridCell>
    <GridCell span={3}>
      <Daemons />
    </GridCell>
  </Grid>
);
