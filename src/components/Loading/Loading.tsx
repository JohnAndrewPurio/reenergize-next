const Loading = () => {
  return (
    <ion-grid>
        <ion-row class="ion-justify-content-center">
            <ion-spinner />
            <ion-text>Fetching resources...</ion-text>
        </ion-row>
    </ion-grid>
  )
}

export default Loading