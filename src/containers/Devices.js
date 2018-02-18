
import React, { Component } from 'react';
import { CircularProgress, MenuList, MenuItem, ListItemText, Typography, withStyles } from 'material-ui';
import { ChevronRight } from 'material-ui-icons';
import type { StyleRules } from 'material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

type Props = {
  devices: {},
  classes: StyleRules
};

class Apps extends Component<Props> {
  render() {
    const { devices } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        {
          devices.length > 0
            ? apps.map(s => (
              <div key={s.name}>
                <Typography component="h1" type="headline" align="center">{s.title}</Typography>
                <MenuList>
                  {
                    s.apps.map(app => (
                      <MenuItem key={app.name} onClick={this.downloadApp(app.name, s.host)}>
                        <ListItemText
                          primary={app.title}
                          secondary={app.description}
                        />
                        <ChevronRight />
                      </MenuItem>
                    ))
                  }
                </MenuList>
              </div>
            ))
            : <CircularProgress size={100} color="primary" />
        }
      </div>
    );
  }
}

export default connect(
  ({ devices }, props) => ({ devices, ...props }),
  (dispatch) => bindActionCreators({ }, dispatch)
)(withStyles(styles)(Apps));

