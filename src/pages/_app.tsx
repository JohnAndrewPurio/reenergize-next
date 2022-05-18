import type { AppProps } from 'next/app'
import { BackButtonEvent, JSX as LocalJSX } from '@ionic/core'
import { JSX as IoniconsJSX } from 'ionicons'
import { HTMLAttributes, MutableRefObject, ReactText, useEffect } from 'react'
import { defineCustomElements as ionDefineCustomElements } from '@ionic/core/loader';
import { useRouter } from 'next/router'
import { appExit } from '../utils/Navigation'
import { routes } from '../utils/Navigation/routes'

import Head from 'next/head'

import '../styles/globals.css'
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


type ToReact<T> = {
  [P in keyof T]?: T[P] & Omit<HTMLAttributes<Element>, 'className'> & {
    class?: string;
    key?: ReactText;
    ref?: MutableRefObject<any>
  }
}

declare global {
  export namespace JSX {
    interface IntrinsicElements extends ToReact<LocalJSX.IntrinsicElements & IoniconsJSX.IntrinsicElements> { }
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    ionDefineCustomElements(window)

    const goBackHandler = (evt: Event) => {
      const event = evt as BackButtonEvent

      event.detail.register(-1, appExit)

      event.detail.register(1, (processNextHandler) => {
        const path = router.pathname

        if (path === routes["DEFAULT"]) {
          processNextHandler()

          return
        }

        router.back()
      })
    }

    document.addEventListener("ionBackButton", goBackHandler)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>ReEnergize</title>
      </Head>
      <ion-app>
        <Component {...pageProps} />
      </ion-app>
    </>
  )
}

export default MyApp
