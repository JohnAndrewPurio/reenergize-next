const SolarMap = () => {
    const targetDate = new Date( Date.now() - (24 * 60 * 60 * 1000) )

    const [month, date, year] = Intl.DateTimeFormat().format(targetDate).split("/")
    const formattedDate = `${year}-${("0" + month).substr(-2)}-${("0" + date).substr(-2)}`

    return (
        <>
            <ion-card class="iframeCard ion-margin">
                <iframe
                    className="solcast-frame"
                    src={
                        `https://solcast.com/embed.html?v=global/${formattedDate}/1280x520`
                    }
                    frameBorder="0"
                    allow="autoplay;"
                />
                <ion-card-header>
                    <ion-title class="ion-text-center">Solar Radiation Map</ion-title>
                </ion-card-header>
            </ion-card>

            <style jsx>{`
                .iframeCard {
                  height: 200px;
                }
            
                .solcast-frame {
                  width: 100%;
                  object-fit: contain;
                }
            `}</style>
        </>
    )
}

export default SolarMap