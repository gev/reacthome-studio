
import React, { Component } from 'react';
import { Grid, GridCell } from '@rmwc/grid';
import {
  Toolbar,
  ToolbarRow,
  ToolbarTitle,
  ToolbarSection
} from '@rmwc/toolbar';

export default class extends Component {
  render() {
    const {
      title, action, children
    } = this.props;
    return (
      <div className="paper">
        <Toolbar theme="text-primary-on-light" style={{ backgroundColor: 'transparent' }}>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <ToolbarTitle>{title}</ToolbarTitle>
              { action }
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        {
          children && (
            <Grid>
              {
                Array.isArray(children)
                  ? children.map((c, i) => <GridCell key={'k'+i} span={4}>{c}</GridCell>)
                  : <GridCell span={4}>{children}</GridCell>
              }
            </Grid>
          )
        }
      </div>
    );
  }
}
