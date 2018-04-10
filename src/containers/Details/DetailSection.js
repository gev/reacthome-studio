
import React, { Component } from 'react';
import { Grid, GridCell } from 'rmwc/Grid';
import {
  Toolbar,
  ToolbarRow,
  ToolbarTitle,
  ToolbarSection
} from 'rmwc/Toolbar';

type Props = {
  title: string,
  action: Component,
  children: []
};

export default class extends Component<Props> {
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
                  ? children.map(i => <GridCell key={i.key} span={3}>{i}</GridCell>)
                  : <GridCell span={3}>{children}</GridCell>
              }
            </Grid>
          )
        }
      </div>
    );
  }
}
