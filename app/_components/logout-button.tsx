
import { authSignOut } from "@/actions/auth-actions";
import { FeLogout } from "./svg/fe-logout";

export default function LogoutButton({
  redirectTo,
}: {
  redirectTo: string;
}) {

  return (
    <form action={async () => {
      await authSignOut(redirectTo);
    }}>
      <button
        className="px-4 py-3 w-full space-x-2 block hover:bg-default-light/[.25] text-left">
        <FeLogout className="text-[20px] align-middle inline-block" />
        <span>Logout</span>
      </button>
    </form>
  )
}