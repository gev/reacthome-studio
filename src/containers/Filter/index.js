
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
    this.setState({ text: '', open: false });
    if (onSelect) onSelect(id);
  }

  render() {
    const { text, open, debonced } = this.state;
    const { id, root } = this.props;
    return (
      <div onFocusCapture={this.open} onBlurCapture={this.close}>
        {
          <TextField id={id} onInput={this.input} text={text} />
        }
        {
          open && debonced.length > 1 && (
            <div style={{
              position: 'absolute',
              maxHeight: '50vh',
              minWidth: '200px',
              backgroundColor: '#f7f7f7',
              overflow: 'auto',
              zIndex: '99999',
            }}>
              <List twoLine>
                <Filter id={root} text={debonced} onSelect={this.select} />
              </List>
            </div>
          )
        }
      </div>
    );
  }
}
