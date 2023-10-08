import React, { ReactElement } from 'react'
import ZoomViewConfig from 'react-native-border-zoom-view'

interface ZoomViewProps {
  children?: ReactElement | ReactElement[],
  style?: object
}

function ZoomView( props:ZoomViewProps ): ReactElement {
  const { children, style } = props
  return (
    <ZoomViewConfig
      minZoom={ 1 }
      maxZoom={ 3 }
      zoomLevels={ 2 }
      style={ style }>
      { children }
    </ZoomViewConfig>
  )
}

export default ZoomView