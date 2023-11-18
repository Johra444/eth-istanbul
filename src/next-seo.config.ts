import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  titleTemplate: '%s | EthGlobal Istanbul',
  defaultTitle: 'Good Goal',
  description: 'EthGlobal Istanbul 2023 Project',
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
}

export default config
