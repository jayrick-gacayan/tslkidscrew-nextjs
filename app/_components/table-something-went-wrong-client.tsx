'use client';

import SomethingWentWrong from './something-went-wrong';

export default function SomethingWentWrongClient() {

  return (
    <tbody>
      <tr >
        <td colSpan={10} rowSpan={10}>
          <div className='w-full h-full flex items-center justify-center'>
            <SomethingWentWrong reload={() => { window.location.reload() }} />
          </div>
        </td>
      </tr>
    </tbody>
  );
}