import { terms } from "../../api/constants"

const Glossary = () => {
    // @ts-ignore
    const alphabeticalGlossary: typeof terms = Object.entries(terms).reduce((acc, [key, value]) => {
        const firstLetter = key[0] as keyof typeof terms
        // @ts-ignore
        if (!acc[firstLetter]) {
            // @ts-ignore
            acc[firstLetter] = {}
        }

        // @ts-ignore
        acc[firstLetter][key] = value

        return acc
    }, {})

    return (
        <ion-list>
            {
                Object.entries(alphabeticalGlossary).map(([key, value]) => (
                    <ion-item-group key={key}>
                        <ion-list-header class="ion-text-capitalize">{key}</ion-list-header>
                        {
                            Object.entries(value).map(([key, data]) => (
                                <ion-item key={key}>
                                    {
                                        console.log(data)
                                    }
                                    <ion-label>
                                        <h4>{data.name}</h4>
                                        <p className="ion-text-wrap">{data.description}</p>
                                    </ion-label>
                                </ion-item>
                            ))
                        }
                    </ion-item-group>
                ))
            }
        </ion-list>
    )
}

export default Glossary