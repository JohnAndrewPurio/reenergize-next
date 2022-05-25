

import Menu from '../components/Menu'

import type { NextPage } from 'next'
import { SearchModalProvider } from '../context/Search'
import Home from '../components/Home'



// Menu Component Parameters
const menuParameters = {
  menuId: "main-menu",
  contentId: "main"
}

const HomePage: NextPage = () => {
  return (
    <Menu {...menuParameters}>
      <SearchModalProvider searchTitle="Search Location" >
        <Home menuParameters={menuParameters} />
      </SearchModalProvider>
    </Menu>
  )
}

export default HomePage
