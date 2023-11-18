import {
    useManageSubscription,
    useSubscription,
    useW3iAccount,
    useInitWeb3InboxClient,
    useMessages
  } from '@web3inbox/widget-react'
  import { useCallback, useEffect } from 'react'
  import { useSignMessage, useAccount } from 'wagmi'
  
  export default function App() {
    const { address } = useAccount()
    const { signMessageAsync } = useSignMessage()
  
    // Initialize the Web3Inbox SDK
    const isReady = useInitWeb3InboxClient({
      // The project ID and domain you setup in the Domain Setup section
      projectId:"10acc3228ec51cb3448e634d4f060d74",
      domain: 'https://eth-istanbul-p76r-git-main-johra444.vercel.app/',
  
      // Allow localhost development with "unlimited" mode.
      // This authorizes this dapp to control notification subscriptions for all domains (including `app.example.com`), not just `window.location.host`
      isLimited: false
    })
  
    const { account, setAccount, isRegistered, isRegistering, register } = useW3iAccount()
    useEffect(() => {
      if (!address) return
      // Convert the address into a CAIP-10 blockchain-agnostic account ID and update the Web3Inbox SDK with it
      setAccount(`eip155:1:${address}`)
    }, [address, setAccount])
  
    // In order to authorize the dapp to control subscriptions, the user needs to sign a SIWE message which happens automatically when `register()` is called.
    // Depending on the configuration of `domain` and `isLimited`, a different message is generated.
    const performRegistration = useCallback(async () => {
      if (!address) return
      try {
        await register(message => signMessageAsync({ message }))
      } catch (registerIdentityError) {
        alert(registerIdentityError)
      }
    }, [signMessageAsync, register, address])
  
    useEffect(() => {
      // Register even if an identity key exists, to account for stale keys
      performRegistration()
    }, [performRegistration])
  
    const { isSubscribed, isSubscribing, subscribe } = useManageSubscription()
  
    const performSubscribe = useCallback(async () => {
      // Register again just in case
      await performRegistration()
      await subscribe()
    }, [subscribe, isRegistered])
  
    const { subscription } = useSubscription()
    const { messages } = useMessages()
  
    return (
      <>
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
                    To manage notifications, sign and register an identity key:&nbsp;
                    <button onClick={performRegistration} disabled={isRegistering}>
                      {isRegistering ? 'Signing...' : 'Sign'}
                    </button>
                  </div>
                ) : (
                  <>
                    {!isSubscribed ? (
                      <>
                        <button onClick={performSubscribe} disabled={isSubscribing}>
                          {isSubscribing ? 'Subscribing...' : 'Subscribe to notifications'}
                        </button>
                      </>
                    ) : (
                      <>
                        <div>You are subscribed</div>
                        <div>Subscription: {JSON.stringify(subscription)}</div>
                        <div>Messages: {JSON.stringify(messages)}</div>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </>
    )
  }