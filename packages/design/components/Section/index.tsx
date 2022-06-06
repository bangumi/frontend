import React from 'react'
import Divider from '../Divider'

export interface SectionProps {
  title: string
}
const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div className="bgm-section">
      <h3 className="bgm-section__title">{title}</h3>
      <Divider className="bgm-section__divider" />
      <div>
        {children}
      </div>
    </div>
  )
}

export default Section
