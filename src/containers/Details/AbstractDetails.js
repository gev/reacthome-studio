
import { Component } from 'react';

type Props = {
  change: (field: string, value: string) => void,
  add: (field: string, type: ?string) => void
};

export default class extends Component<Props> {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  add = (field, type) => () => {
    this.props.add(field, type);
  }
}
