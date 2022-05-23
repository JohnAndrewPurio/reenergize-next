import React, { FC } from 'react'

interface SearchResultsListProps {
    items: ItemProps[]
}

const SearchResultsList: FC<SearchResultsListProps> = ({ items }) => {
  return (
    <ion-list>
        {
            items.map(({ id, name, handler }) => (
                <ion-item key={id} button onClick={handler}>
                    {name}
                </ion-item>
            ))
        }
    </ion-list>
  )
}

export default SearchResultsList