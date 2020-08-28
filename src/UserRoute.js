import React,{ Suspense} from 'react'
import { connect } from "react-redux"
import Spinner from "./components/@vuexy/spinner/Loading-spinner"
import { ContextLayout } from "./utility/context/Layout"
import {Route,Redirect} from 'react-router-dom'

const UserRoute = ({component: Component,fullLayout, role,...rest})=>{
    console.log('ROLE',role)
    return (
      <Route
        {...rest}
        render={props =>{
          console.log('pppp----',props)
          if(role)
          {
              return <ContextLayout.Consumer>
              {context => {
                let LayoutTag =
                  fullLayout === true
                    ? context.fullLayout
                    : context.state.activeLayout === "horizontal"
                    ? context.horizontalLayout
                    : context.VerticalLayout
                  return (
                    <LayoutTag {...props} permission={props}>
                      <Suspense fallback={<Spinner />}>
                        <Component {...props} />
                      </Suspense>
                    </LayoutTag>
                  )
              }}
            </ContextLayout.Consumer>
          }else{
              return <Redirect to='/pages/login' />
          }
        //   return (
        //     userInfo
        //      ? <Component {...props} />
        //      :<Redirect to={{pathname: '/pages/login', state: {from: props.location}}} />
        //   )}}
        }}
      />
    )
  }
  
export default UserRoute