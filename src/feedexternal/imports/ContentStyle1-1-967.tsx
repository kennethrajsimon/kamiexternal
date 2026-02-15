import svgPaths from "./svg-syooslib8a";
const imgRectangle1540 = "/assets/4ccdd68ed9d9b6d43906560f18dfab9e0653e953.png";

function Frame3() {
  return (
    <div className="absolute content-stretch flex h-[280px] items-start left-[80px] max-h-[280px] max-w-[600px] py-[10px] top-[80px] w-[600px]">
      <div className="flex-[1_0_0] font-['Inter:Light',sans-serif] font-light leading-[normal] min-h-px min-w-px not-italic relative text-[#f1f0eb] text-[60px] whitespace-pre-wrap">
        <p className="mb-0">BEYOND</p>
        <p>THE SCREENSHOT</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-end left-[calc(50%+16px)] top-1/2 w-[660px]">
      <div className="h-[691px] relative shrink-0 w-[664px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ borderRadius: '3px' }}>
          <img alt="" className="absolute h-[104.84%] left-[11.44%] max-w-none top-[0.09%] w-[88.49%]" src={imgRectangle1540} />
        </div>
      </div>
    </div>
  );
}

function Heart() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="heart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="heart">
          <path clipRule="evenodd" d={svgPaths.p2e417780} fillRule="evenodd" id="Icon" stroke="var(--stroke-0, #F1F0EB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Send() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="send-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="send-01">
          <path d={svgPaths.p3e23b940} id="Icon" stroke="var(--stroke-0, #F1F0EB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[18px] items-end justify-start relative shrink-0">
      <div className="flex flex-col items-center gap-[6px]">
        <Heart />
        <div className="text-[#f1f0eb] text-[14px] leading-[normal]">112</div>
      </div>
      <div className="flex flex-col items-center gap-[6px]">
        <Send />
        <div className="text-[#f1f0eb] text-[14px] leading-[normal]">23</div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[370px] items-start justify-end left-[80px] max-h-[370px] max-w-[600px] top-[401px] w-[600px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal h-[18px] leading-[normal] not-italic relative shrink-0 text-[#f1f0eb] text-[13px] w-full whitespace-pre-wrap">WORDS: KAMI EDITORIAL TEAM</p>
      <div className="font-['Inter:Regular',sans-serif] font-normal h-[130px] leading-[normal] not-italic relative shrink-0 text-[#f1f0eb] text-[0px] w-full whitespace-pre-wrap">
        <p className="font-['Inter:Bold',sans-serif] font-bold mb-0 text-[#11ff49] text-[20px]">{`How KAMI, Soneium and Camp Network are building the global fortress for creator IP. `}</p>
        <p className="mb-0 text-[20px]">&nbsp;</p>
        <p className="mb-0 text-[15px]">{`Until now, "protecting your work" was just another way of saying "fingers crossed." KAMI is ending the era of creative theft and replacing it with unshakeable onchain infrastructure powered by the world’s biggest names in creativity.`}</p>
        <p className="text-[20px]">&nbsp;</p>
      </div>
      <Frame1 />
    </div>
  );
}

function NextPage() {
  return (
    <div className="-translate-y-1/2 absolute h-[299.99px] right-0 top-[calc(50%+0.5px)] w-[50px]" data-name="Next Page">
      <div className="absolute inset-[-35.76%_-147.26%_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 123.632 407.276">
          <g id="Next Page">
            <path d={svgPaths.p2f03d280} fill="var(--fill-0, #9E9E9D)" id="Subtract" opacity="0.25" />
            <g id="Group 48096527">
              <path d={svgPaths.p2c028b00} fill="var(--stroke-0, #1A1A1A)" id="Line 95" />
              <path d={svgPaths.p19fbfa00} fill="var(--stroke-0, #1A1A1A)" id="Line 96" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function ContentStyle() {
  return (
    <div className="bg-[#1a1a1a] relative size-full" data-name="Content – Style 1">
      <Frame3 />
      <Frame />
      <Frame2 />
      <NextPage />
    </div>
  );
}
