import { Parent } from '@/models/parent';
import { Tab } from '@headlessui/react';
import AddBankDetailsUsingPlaid from './add-bank-details-using-plaid';
import BankDetailsInfo from './bank-details-info';

export default function BankDetails({
  bankDetails
}: {
  bankDetails: Pick<Parent, 'bank_name' | 'bank_verified' | 'stripe_bank_identifier'> | undefined;
}) {

  return (
    <Tab.Panel as='div' className='space-y-4'>
      {
        (!!bankDetails && !!bankDetails.bank_name && !!bankDetails.bank_verified && !!bankDetails.stripe_bank_identifier) ?
          (<BankDetailsInfo bankDetails={bankDetails} />) : (<AddBankDetailsUsingPlaid />)
      }
    </Tab.Panel>
  );
}
