export default function RememberMe() {
  return (
    <div className="block form-control">
      <label className="flex items-center gap-2">
        <input type="checkbox"
          className="border-[.1rem] border-secondary-light h-5 w-5 inline-block checkbox checked:border-primary rounded" />
        <span className="inline-block align-">Remember me</span>
      </label>
    </div>
  )
}