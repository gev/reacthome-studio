
import debounce from 'debounce';
import React, { Component } from 'react';
import { List } from '@rmwc/list';
import TextField from './TextField';
import Filter from './Filter';

export default class extends Component {
  state = { text: '', debonced: '' };

  debonced = debounce(debonced => {
    this.setState({ debonced, open: true });
  }, 250)

  input = (event) => {
    const text = event.target.value;
    this.setState({ text });
    this.debonced(text)
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

  render() {
    const { text, open, debonced } = this.state;
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
                <Filter id={root} type={type} text={debonced} onSelect={this.select} />
              </List>
            </div>
          )
        }
      </div>
    );
  }
}
