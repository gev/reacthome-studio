
import { Component } from 'react';

type Props = {
  change: (field: string, value: string) => void,
  create: (field: string, type: ?string, ref: ?string) => void,
  add: (field: string, subj: string) => void,
  remove: (subj: string, field: string, obj: string) => void
};

export default class extends Component<Props> {
  change = (event) => {
    const { change } = this.props;
    const { id, value } = event.target;
    change({ [id]: value });
  }

  create = (field, type, bind) => () => {
    this.props.create(field, type, bind);
  }

  add = (field, subj) => () => {
    this.props.add(field, subj);
  }

  remove = (subj, field, obj) => () => {
    this.props.remove(subj, field, obj);
  }
}
