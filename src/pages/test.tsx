import {
  useManageSubscription,
  useSubscription,
  useW3iAccount,
  useInitWeb3InboxClient,
  useMessages,
} from "@web3inbox/widget-react";
import { useCallback, useEffect } from "react";
import { useSignMessage, useAccount } from "wagmi";

export default function App() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  // Initialize the Web3Inbox SDK
  const isReady = useInitWeb3InboxClient({
    projectId: "10acc3228ec51cb3448e634d4f060d74",
    domain: "https://eth-istanbul-p76r.vercel.app/",
    isLimited: false,
  });

  const { account, setAccount, isRegistered, isRegistering, register } =
    useW3iAccount();
  useEffect(() => {
    if (!address) return;
    setAccount(`eip155:1:${address}`);
  }, [address, setAccount]);

  const performRegistration = useCallback(async () => {
    if (!address) return;
    try {
      await register((message) => signMessageAsync({ message }));
    } catch (registerIdentityError) {
      alert(registerIdentityError);
    }
  }, [signMessageAsync, register, address]);

  useEffect(() => {
    performRegistration();
  }, [performRegistration]);

  const { isSubscribed, isSubscribing, subscribe } = useManageSubscription();

  const performSubscribe = useCallback(async () => {
    await performRegistration();
    await subscribe();
  }, [subscribe, isRegistered]);

  const { subscription } = useSubscription();
  const { messages } = useMessages();

  // Function to perform the fetch request
  const sendNotification = async () => {
    try {
      const response = await fetch(
        "https://notify.walletconnect.com/10acc3228ec51cb3448e634d4f060d74/notify",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTIFY_API_SECRET}`,
          },
          body: JSON.stringify({
            notification: {
              type: "ef23acd4-54bf-4d55-b71e-9a10f4a48155",
              title: "Notification Title",
              body: "Notification body"
            },
            accounts: ["eip155:1:0xABC123"],
          }),
        }
      );
      if (response.ok) {
        console.log("Notification sent successfully");
      } else {
        console.error("Error sending notification", response);
      }
    } catch (error) {
      console.error("Error sending notification", error);
    }
  };

  return (
    <div className="mt-48">
      {!isReady ? (
        <div>Loading client...</div>
      ) : (
        <>
          {!address ? (
            <div>Connect your wallet</div>
          ) : (
            <>
              <div>Address: {address}</div>
              <div>Account ID: {account}</div>
              {!isRegistered ? (
                <div>
                  To manage notifications, sign and register an identity
                  key:&nbsp;
                  <button
                    onClick={performRegistration}
                    disabled={isRegistering}
                  >
                    {isRegistering ? "Signing..." : "Sign"}
                  </button>
                </div>
              ) : (
                <>
                  {!isSubscribed ? (
                    <>
                      <button
                        onClick={performSubscribe}
                        disabled={isSubscribing}
                      >
                        {isSubscribing
                          ? "Subscribing..."
                          : "Subscribe to notifications"}
                      </button>
                      <button onClick={sendNotification}>
                        Send Notification
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="mt-48">You are subscribed</div>
                      <div>Subscription: {JSON.stringify(subscription)}</div>
                      <div>Messages: {JSON.stringify(messages)}</div>
                      {/* New Button to Send Notification */}
                      <button onClick={sendNotification}>
                        Send Notification
                      </button>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
