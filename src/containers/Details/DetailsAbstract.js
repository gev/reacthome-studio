
import { Component } from 'react';

type Props = {
  change: (payload: {}) => void,
  create: (field: string, type: ?string, ref: ?string) => void,
  add: (field: string, subj: string) => void,
  addBind: (field: string, subj: string, bind: ?string) => void,
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

  addBind = (field, subj, bind) => () => {
    this.props.addBind(field, subj, bind);
  }

  remove = (subj, field, obj) => () => {
    this.props.remove(subj, field, obj);
  }
}
