import { Parent } from '@/models/parent';
import ParentInfoData from '../../_components/parent-info-data';
import Fa6SolidLink from '@/app/_components/svg/fa6-solid-link';
import { unlinkBankDetailsAction } from '@/actions/plaid-actions';
import { ToastContentProps, toast } from 'react-toastify';
import { tagRevalidate } from '@/actions/common-actions';
import { confirmSwalInfo } from '@/types/helpers/sweet-alert-helpers';

export default function BankDetailsInfo({
  bankDetails,
}: {
  bankDetails: Pick<Parent, 'bank_name' | 'bank_verified' | 'stripe_bank_identifier'>
}) {

  async function unlinkBankDetails() {

    let swalResult = await confirmSwalInfo(
      'Are you sure you want to unlink bank',
      bankDetails.bank_name
    );

    if (swalResult.isConfirmed) {
      let result = await unlinkBankDetailsAction();

      let { message, success } = result;

      toast((props: ToastContentProps<unknown>) => {
        return (<div className="text-black">{message}</div>);
      }, {
        toastId: `unlink-bank-details-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      });

      if (success) { await tagRevalidate('customer-info'); }
    }
  }

  return (
    <div className='block'>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex-1'>
          <div className='border rounded-lg border-secondary-light p-2'>
            <ParentInfoData labelText='Bank Name' data={bankDetails.bank_name} />
            <ParentInfoData labelText='Verified' data={(bankDetails.bank_verified ? 'true' : 'false') ?? 'false'} />
            <ParentInfoData labelText='Stripe Bank Identifier' data={bankDetails.stripe_bank_identifier} />
          </div>
        </div>
        <div className='flex-none'>
          <button onClick={unlinkBankDetails}>
            <Fa6SolidLink className='text-secondary-light inline-block text-[48px] hover:text-tertiary cursor-pointer' />
          </button>
        </div>
      </div>
    </div>
  );
}