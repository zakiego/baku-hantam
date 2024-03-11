import { SITE_CONFIG } from "@/lib/const";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const headerList = headers();
  const domain = headerList.get("x-request-domain");

  const title =
    domain === "tukar-pikiran.vercel.app" ? "TukarPikiran" : "BakuHantam";

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href={"/"}>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-xl text-balance">
                  {title}
                </h1>
              </Link>
            </div>
            {/* <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="#"
                className="text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </a>
            </div> */}
          </div>
          <div>
            <a href={SITE_CONFIG.REPOSITORY_URL}>
              <Image src="/github.svg" alt="github" width={30} height={30} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
