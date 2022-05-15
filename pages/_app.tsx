import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { JSX as LocalJSX } from '@ionic/core'
import { JSX as IoniconsJSX } from 'ionicons'
import { HTMLAttributes, ReactText, useEffect } from 'react'
import { defineCustomElements as ionDefineCustomElements } from '@ionic/core/loader';
/* Core CSS required for Ionic components to work properly */
import '@ionic/core/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/core/css/normalize.css';
import '@ionic/core/css/structure.css';
import '@ionic/core/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/core/css/padding.css';
import '@ionic/core/css/float-elements.css';
import '@ionic/core/css/text-alignment.css';
import '@ionic/core/css/text-transformation.css';
import '@ionic/core/css/flex-utils.css';
import '@ionic/core/css/display.css';
import Head from 'next/head'

type ToReact<T> = {
  [P in keyof T]?: T[P] & Omit<HTMLAttributes<Element>, 'className'> & {
    class?: string;
    key?: ReactText;
  }
}

declare global {
  export namespace JSX {
    interface IntrinsicElements extends ToReact<LocalJSX.IntrinsicElements & IoniconsJSX.IntrinsicElements> { }
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    ionDefineCustomElements(window)
  }, [])

  return (
    <>
      <Head>
        <title>ReEnergize</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
