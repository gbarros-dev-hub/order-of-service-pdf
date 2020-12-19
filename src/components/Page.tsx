import React, { forwardRef, HTMLProps } from 'react'
import { Helmet } from 'react-helmet'

type PageProps = HTMLProps<HTMLDivElement> & {
  children?: React.ReactNode
  title?: string
}

const Page = forwardRef<HTMLDivElement, PageProps>(({ children, title, ...rest }, ref) => (
  <div ref={ref as any} {...rest}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </div>
))

export default Page
