import React from 'react'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'

interface IProps{
    loadingText?: string
}

export const LoadingComponent:React.FC<IProps> = ({loadingText}) => {
    return (
      <Dimmer active inverted>
        <Loader inverted>{loadingText}</Loader>
      </Dimmer>
    )
}
