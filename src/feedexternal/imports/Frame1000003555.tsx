const imgRectangle1540 = "/assets/1e2c0b75f3380f734d584408cd01b575701ebed4.png";

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute left-0 size-[300px] top-0">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[132.76%] left-0 max-w-none top-[-12.68%] w-full" src={imgRectangle1540} />
        </div>
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[23px] leading-[normal] left-[18px] not-italic text-[#f1f0eb] text-[20px] top-[235px] w-[282px] whitespace-pre-wrap">
        PRODUCT NAME
        <br aria-hidden="true" />
        <br aria-hidden="true" />
      </p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[24px] leading-[normal] left-[18px] not-italic text-[#f1f0eb] text-[15px] top-[261px] w-[195px] whitespace-pre-wrap">
        Creator Name
        <br aria-hidden="true" />
        <br aria-hidden="true" />
      </p>
    </div>
  );
}
