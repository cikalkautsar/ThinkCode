import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen relative bg-white overflow-hidden justify-center items-center gap-4">
      <div className="flex w-120 h-60 items-center justify-center">
        <img className="w-full h-full object-cover" src="logo.png" />
      </div>
      <div className="flex w-60 h-14 py-1 bg-slate-900 rounded-xl outline outline-1 outline-offset-[-1px] outline-white inline-flex justify-center items-center">
        <div className="justify-start text-white text-3xl font-bold">LOGIN</div>
      </div>
      <div className="flex w-60 h-14 py-1 bg-zinc-300 rounded-xl outline outline-1 outline-offset-[-1px] outline-black inline-flex justify-center items-center">
        <div className="justify-start text-black text-3xl font-bold">SIGN UP</div>
      </div>
    </div>  
  );
}
