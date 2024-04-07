
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SCRIPT } from '../../constants';
import Autocomplete from '../Filter';

class Container extends Component {
  render() {
    const {
      id, project, onSelect
    } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <Autocomplete id={id} root={project} onSelect={onSelect} type={SCRIPT} />
            </td>
            {id && (
              <td>
                <Link to={`/project/${project}/${id}`}>...</Link>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    );
  }
}

export default connect(
  ({ pool }, { id }) => pool[id] || {}
)(Container);
