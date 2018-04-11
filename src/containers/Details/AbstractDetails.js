
import { Component } from 'react';

type Props = {
  change: (field: string, value: string) => void,
  add: (field: string) => void
};

export default class extends Component<Props> {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  add = (field) => () => {
    this.props.add(field);
  }
}
