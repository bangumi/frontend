import React from 'react'

export interface SectionProps {
  title: string
  renderFooter?: () => React.ReactNode
}
const Section: React.FC<SectionProps> = ({ title, children, renderFooter }) => {
  return (
    <div className="bgm-section">
      <h3 className="bgm-section__title">{title}</h3>
      {children}
      {renderFooter && <div className="bgm-section__footer">
        {renderFooter()}
      </div>}
    </div>
  )
}

export default Section
