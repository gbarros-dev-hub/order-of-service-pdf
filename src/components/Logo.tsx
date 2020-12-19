import React from 'react'

type LogoProps = {
  [key: string]: any
}

const Logo: React.FC<LogoProps> = (props) => {
  return <img alt="Logo" src="/static/logo.svg" {...props} />
}

export default Logo
