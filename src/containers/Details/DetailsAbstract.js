
import { Component } from 'react';

export default class extends Component {
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
