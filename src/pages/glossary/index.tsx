import { NextPage } from 'next'
import Glossary from '../../components/Glossary'
import Toolbar from '../../components/Toolbar'

const GlossaryPage: NextPage = () => {
  return (
    <>
        <ion-header>
            <Toolbar name="Terms Used" />
        </ion-header>
        <ion-content>
            <Glossary />
        </ion-content>
    </>
  )
}

export default GlossaryPage