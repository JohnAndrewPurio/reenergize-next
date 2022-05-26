

import Menu from '../components/Menu'

import type { GetStaticProps, NextPage } from 'next'
import { SearchModalProvider } from '../context/Search'
import Home from '../components/Home'

interface HomeProps {
  apiUrl: string
}

// Menu Component Parameters
const menuParameters = {
  menuId: "main-menu",
  contentId: "main"
}

const HomePage: NextPage<HomeProps> = ({ apiUrl }) => {
  console.log("Home Page URL:", apiUrl)

  return (
    <Menu {...menuParameters}>
      <SearchModalProvider searchTitle="Search Location" >
        <Home menuParameters={menuParameters} apiUrl={apiUrl} />
      </SearchModalProvider>
    </Menu>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
      props: {
          apiUrl: process.env.API_BASE_URL || "https://reenergize-server.herokuapp.com/"
      }
  }
}

export default HomePage