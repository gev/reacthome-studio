
import { List, ListDivider, ListItem, ListItemPrimaryText, ListItemSecondaryText, ListItemText } from '@rmwc/list';
import debounce from 'debounce';
import { remote } from 'electron';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { v4 as uuid } from 'uuid';
import { creates } from '../../actions';
import { SCRIPT, SITE } from '../../constants';
import Filter from './Filter';
import TextField from './TextField';


class Container extends Component {
  state = { text: '', debounced: '' };

  debounced = debounce(debounced => {
    this.setState({ debounced, open: true });
  }, 250)

  input = (event) => {
    const text = event.target.value;
    this.setState({ text });
    this.debounced(text)
  }

  open = () => {
    this.setState({ open: true });
  }

  close = () => {
    this.setState({ open: false });
  }

  select = (id) => {
    const { onSelect } = this.props;
    this.setState({ open: false });
    if (onSelect) onSelect(id);
  }

  create = () => {
    if (remote.dialog.showMessageBoxSync(null, {
      type: 'question',
      buttons: ['Create', 'Cancel'],
      defaultId: 0,
      cancelId: 1,
      detail: '',
      message: 'Create a new script?'
    }) === 0) {
      const id = uuid();
      this.props.create(id);
      this.select(id);
    }
  }


  render() {
    const { text, open, debounced } = this.state;
    const { id, root, type } = this.props;
    return (
      <div onFocusCapture={this.open} onBlurCapture={this.close}>
        {
          <TextField id={id} onInput={this.input} text={open && text} />
        }
        {
          open && (
            <div style={{
              position: 'absolute',
              maxHeight: '50vh',
              minWidth: '200px',
              backgroundColor: '#f7f7f7',
              overflow: 'auto',
              zIndex: '9999',
            }}>
              <List twoLine>
                {
                  type === SCRIPT && (
                    <ListItem onMouseDown={this.create}>
                      <ListItemText>
                        <ListItemPrimaryText>New...</ListItemPrimaryText>
                        <ListItemSecondaryText>Create a new script</ListItemSecondaryText>
                      </ListItemText>
                    </ListItem>
                  )
                }
                {
                  type === SCRIPT && (
                    <ListDivider />
                  )
                }
                <Filter id={root} type={type} text={debounced} onSelect={this.select} />
              </List>
            </div>
          )
        }
      </div>
    );
  }
}

export default connect(
  () => { },
  (dispatch, { root }) => bindActionCreators({
    create: (id) => creates(root, id, SCRIPT, SCRIPT, SITE)
  }, dispatch)
)(Container)
