import { alertColor, margin, fontSize, textColor, textContainer } from '../styles.json'
import { Animated, Image, Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import AppContext from '../../app_context'
import AppView from './AppView'
import { Data } from '../interfaces/user_data'
import deleteAccount from '../scripts/delete_account'
import { GetUserPictureResult } from '../services/get_user_picture'
import { HideFunction, useHiding } from 'react-component-switcher'
import Opacity from '../interfaces/Opacity'
import quitView from '../../assets/images/quit_view.png'
import React, { ReactElement, useContext, useEffect, useRef } from 'react'
import useBackButton from '../hooks/back_button'
import { useViewport } from 'react-native-viewport-provider'

function useAnimation( hiding:boolean ): Animated.Value {
  const opacity = useRef( new Animated.Value( 0 ) ).current
  useEffect( () => {
    const toValue: Opacity = hiding
      ? Opacity.HIDE
      : Opacity.SHOW
    Animated.timing( opacity, {
      toValue: toValue,
      duration: 400,
      useNativeDriver: true,
    } ).start()
  }, [ hiding ] )
  return opacity
}

interface BackButtonProps { quit:HideFunction }

function BackButton( props:BackButtonProps ): ReactElement {
  const { quit } = props
  return (
    <TouchableOpacity style={ useViewport( styles.backButton ) } onPress={ quit }>
      <Image source={ quitView } style={ styles.backButtonImage } />
    </TouchableOpacity>
  )
}

interface ProfileImageProps { uri:GetUserPictureResult|null }

function ProfileImage( props:ProfileImageProps ): ReactElement {
  const { uri } = props
  const image: ReactElement = uri
    ? <Image source={ { uri } } style={ useViewport( styles.image ) } />
    : <View style={ useViewport( styles.image ) } />
  return image
}

interface ProfilePropertyProps {
  target: string,
  children: string | null,
}

function ProfileProperty( props:ProfilePropertyProps ): ReactElement {
  const { target, children:text } = props
  return (
    <Text numberOfLines={ 1 } textBreakStrategy="simple" style={ useViewport( styles.profileProperty ) }>
      <Text style={ { fontWeight: '700' } }>{ target }:</Text> { text ? text : '--- ---' }
    </Text>
  )
}

function DeleteAccountButton(): ReactElement {
  const { SwitchableBooleanCard, SwitchableLoadingWall } = useContext( AppContext )
  return (
    <TouchableOpacity
      style={ useViewport( styles.deleteAccountButton ) }
      onPress={
        () => deleteAccount( SwitchableBooleanCard, SwitchableLoadingWall )
      }>
      <Text style={ useViewport( styles.deleteAccountButtonText ) }>Delete</Text>
    </TouchableOpacity>
  )
}

interface ProfileViewProps { quit:HideFunction }

type ProfileViewCallerProps = Data

function ProfileView( props:ProfileViewProps, callerProps:ProfileViewCallerProps, id:number ): ReactElement {
  const { quit } = props
  const { name, email, picture } = callerProps
  const backButton = <BackButton quit={ quit } />
  const hiding = useHiding( id )
  const opacity: Animated.Value = useAnimation( hiding )
  useBackButton( () => quit() )
  return (
    <Animated.View style={ [ styles.container, { opacity } ] }>
      <AppView Back={ backButton } title="Profile">
        <ProfileImage uri={ picture } />
        <ProfileProperty target="Name">{ name }</ProfileProperty>
        <ProfileProperty target="Email">{ email }</ProfileProperty>
        <DeleteAccountButton />
      </AppView>
    </Animated.View>
  )
}

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  backButton: {
    width: textContainer as unknown as number,
    height: textContainer as unknown as number,
    marginTop: margin as unknown as number,
    marginLeft: margin as unknown as number,
    justifyContent: 'center',
    alignContent: 'center',
  },
  backButtonImage: {
    width: '80%',
    height: '80%',
  },
  image: {
    width: '30.58vw' as unknown as number,
    height: '30.58vw' as unknown as number,
    marginTop: margin as unknown as number,
    marginBottom: margin as unknown as number,
    borderRadius: '16vw' as unknown as number,
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
  },
  profileProperty: {
    width: `100vw - ${ margin } * 2` as unknown as number,
    marginTop: margin as unknown as number,
    marginLeft: margin as unknown as number,
    color: textColor,
    fontSize: `${ fontSize } * 0.83` as unknown as number,
    flexDirection: 'row',
  },
  deleteAccountButton: {
    width: '36.9vw' as unknown as number,
    height: '11.95vw' as unknown as number,
    position: 'absolute',
    bottom: margin as unknown as number,
    borderRadius: '3vw' as unknown as number,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  deleteAccountButtonText: {
    color: alertColor,
    fontSize: `${ fontSize } * 0.83` as unknown as number,
    textAlign: 'center',
  },
} )

export default ProfileView
export { ProfileViewCallerProps, ProfileViewProps }