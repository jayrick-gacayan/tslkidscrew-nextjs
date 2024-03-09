import FluentTableDismiss16Filled from "./svg/fluent-table-dismiss-16-filled";

export default function TableEmptyData() {
  return (
    <tbody>
      <tr>
        <td colSpan={10} rowSpan={10}>
          <div className="w-full h-full flex items-center justify-center">
            <div className='space-y-4 rounded flex-none w-auto'>
              <div className='text-tertiary w-fit m-auto block'>
                <FluentTableDismiss16Filled height={192} width={192} />
              </div>
              <div className='text-center space-y-2 font-semibold'>
                <h1 className='text-[48px] text-danger'>No Data!</h1>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  )

}