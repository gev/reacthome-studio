
import { Typography } from '@rmwc/typography';
import React, { Component } from 'react';
import { DI } from '../../../constants';
import CardSmartTopButton from './CardSmartTopButton';

const Cell = ({ id, index }) => {
  return (
    <div>
      <Typography use="body">{index}</Typography>
      <CardSmartTopButton id={`${id}/${DI}/${index}`} />
    </div>
  );
}


export default class extends Component {
  render() {
    const { id, button } = this.props;
    return button === 4 && (
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
