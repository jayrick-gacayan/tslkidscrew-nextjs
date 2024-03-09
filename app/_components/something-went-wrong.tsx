import PhSmileyAngryFill from "./svg/ph-smiley-angry-fill";

export default function SomethingWentWrong({
  reload
}: {
  reload: () => void;
}) {
  return (
    <div className='space-y-4 rounded flex-none w-auto p-4'>
      <div className='text-danger w-fit m-auto block'>
        <PhSmileyAngryFill height={192} width={192} />
      </div>
      <div className='text-center space-y-2 font-semibold'>
        <h1 className='text-[48px]'>Something went wrong!</h1>
      </div>
      <button className="w-auto p-2 block m-auto rounded bg-primary text-white"
        onClick={reload}>Try again</button>
    </div>
  )
}