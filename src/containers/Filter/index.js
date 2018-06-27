
import React, { Component } from 'react';
import { List } from 'rmwc/List';
import TextField from './TextField';
import Filter from './Filter';

type Props = {
  id: string,
  root: string,
  onSelect: ?(id: string) => void
};

export default class extends Component<Props> {
  state = { text: null };

  input = (event) => {
    this.setState({ text: event.target.value });
  }

  open = () => {
    this.setState({ open: true });
  }

  close = () => {
    this.setState({ open: false, text: null });
  }

  select = (id) => {
    const { onSelect } = this.props;
    this.setState({ text: '' });
    if (onSelect) onSelect(id);
  }

  render() {
    const { text, open } = this.state;
    const { id, root } = this.props;
    return (
      <div
        onFocusCapture={this.open}
        onBlurCapture={this.close}
      >
        {
          <TextField id={id} onInput={this.input} text={text} />
        }
        {
          open && (
            <List twoLine>
              <Filter root={root} text={text} onSelect={this.select} />
            </List>
          )
        }
      </div>
    );
  }
}
