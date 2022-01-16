import React from 'react'
import './style/Link.less'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {

}

const Link: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
  return <a className="bgm-classic-link" {...props}>{props.children}</a>
}

export default Link
