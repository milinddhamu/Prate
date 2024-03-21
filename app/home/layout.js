"use client"
import MenuBar from "@/components/side-menubar";
import { RecoilRoot } from "recoil";
const HomeLayout =  ({ children }) => {  
  return (
    <RecoilRoot>
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-row max-w-screen-lg w-full">
          <div className="relative flex w-2/12 md:w-1/3 lg:w-1/4">{/*     205px 341px  306px */}
          <div className="sticky top-0 flex h-dvh max-h-dvh w-full transition-all duration-300 ease-inout">
          <MenuBar />
          </div>
          </div>
          <div className=" right-0 flex w-10/12 md:w-2/3 lg:w-3/4 border-r border-gray-500/50 min-h-screen">
            <div className="flex w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
};

export default HomeLayout;