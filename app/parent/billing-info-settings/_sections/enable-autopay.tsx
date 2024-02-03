import { Switch } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function EnableAutopay() {
  const [enableAutopay, setEnableAutopay] = useState(false);

  return (
    <div className="pb-8">
      <div className="flex items-center gap-16">
        <div className="flex-1 space-y-2">
          <h3 className="font-medium">Enable Autopay</h3>
          <p>Enabling autopay will automatically deduct the amount of future invoices from your provided payment method.</p>
        </div>
        <div className="flex-none w-auto">
          <Switch checked={enableAutopay} onChange={setEnableAutopay} as={Fragment}>
            {({ checked }) => (
              <button className={`${checked ? 'bg-blue-600' : 'bg-white border border-primary'
                } relative inline-flex h-6 w-11 items-center rounded-full`}>
                <span className={`${checked ? 'translate-x-6 bg-white' : 'translate-x-1 bg-primary'} 
                      inline-block h-4 w-4 transform rounded-full  transition`} />
              </button>
            )}
          </Switch>
        </div>
      </div>
    </div>
  )
}