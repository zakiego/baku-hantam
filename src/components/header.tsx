import { AddButton, DeleteButton } from "@/components/button";
import { ArrowRightIcon } from "@/components/icon";
import { SITE_CONFIG } from "@/lib/const";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="bg-white px-6 py-12 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-balance">
          Debat Tech Twitter Indonesia
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600 text-balance">
          Nikmati debatnya, serap ilmunya, abaikan lainnya
        </p>

        <div className="mt-8 flex justify-center space-x-3">
          <div className="mt-2">
            <Link
              href="/leaderboard"
              // white button, text-black, bg-balance-600 on hover
              className="text-sm text-balance-600 hover:bg-balance-600  border border-balance-600 px-4 py-2 rounded-md"
            >
              Lihat Leaderboard
              <ArrowRightIcon className="inline-block w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
        <div className="mt-8 flex justify-center space-x-3">
          <div className="mt-2">
            <AddButton href={SITE_CONFIG.FORM}>Tambahkan Tweet</AddButton>
          </div>
          {/* REQUEST DELETE BUTTON */}
          <div className="mt-2">
            <DeleteButton href={SITE_CONFIG.DELETE_FORM}>
              Request Hapus Tweet
            </DeleteButton>
          </div>
        </div>
      </div>
    </div>
  );
};
