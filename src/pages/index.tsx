import CustomConnect from "@/components/CustomConnect";
import { NextSeo } from "next-seo";
import { useAccount } from "wagmi";
import Link from "next/link";
import { Button } from "@ensdomains/thorin";

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <div className="w-full h-[100vh] flex justify-center flex-col items-center px-4">
      <NextSeo title={"Grow or Gamble"} />
      {isConnected ? (
        <div className="w-full h-[100vh] flex  flex-col items-center justify-around">
          <h1 className="mb-4 text-5xl text-center font-bold">Grow or Gamble</h1>
          <div className="flex flex-col items-center w-full gap-4">
            <Link href={"/group/createGroup"} className="w-full">
              <Button>
                Create Group
              </Button>
            </Link>
            <Link href={"/group/joinGroup"} className="w-full">
              <Button colorStyle="accentSecondary">
                Join Group
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full h-[100vh] flex  flex-col items-center justify-around">
          <h1 className="mb-4 text-5xl text-center font-bold">Group Goals</h1>
          <div>
            <CustomConnect />
            <Button>
              Create Wallet
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
