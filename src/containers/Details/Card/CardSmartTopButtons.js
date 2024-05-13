
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { BUTTON } from '../../../constants';
import CardSmartTopButton from './CardSmartTopButton';

const Cell = ({ id, index }) => {
  return (
    <div>
      <Typography use="body">{index}</Typography>
      <CardSmartTopButton id={`${id}/${BUTTON}/${index}`} />
    </div>
  );
}


export default class extends Component {
  render() {
    const { id } = this.props;
    return (
      <table>
        <tbody>
          <tr>
            <td className="paper">
              <Cell id={id} index={1} />
            </td>
            <td className="paper">
              <Cell id={id} index={2} />
            </td>
          </tr>
          <tr>
            <td className='paper'>
              <Cell id={id} index={3} />
            </td>
            <td className='paper'>
              <Cell id={id} index={4} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
