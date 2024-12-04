/* eslint-disable @next/next/no-img-element */
export default function Buymeacoffee() {
  return (
    <a
      href="https://www.buymeacoffee.com/sergeivas"
      className="flex lg:flex-row flex-col justify-center lg:justify-around items-center gap-2 border-zinc-200 hover:dark:border-[#ffdd0060] hover:border-[#e6d14fe7] dark:border-zinc-800 bg-secondary-bg hover:dark:bg-[#2e290e44] dark:bg-primary-bg p-6 border rounded-lg min-h-[110px] text-center lg:text-start duration-300 group"
      target="_blank"
      rel="noreferrer noopener"
    >
      Do you feel like supporting my work? 🙂
      <img
        className="group-hover:grayscale-0 duration-300 grayscale"
        alt="Buymeacoffee button"
        loading="lazy"
        src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=sergeivas&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
      />
    </a>
  );
}
