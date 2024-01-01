import Link from 'next/link'
import * as react from 'react'
interface Myprops {
    children: React.ReactNode,
    href:string
}
const Links : react.FC<Myprops> = ({children,href,...rest}) => {
  return (
    <Link href={href} passHref legacyBehavior>
        <a href={href} {...rest} className="text-center">{children}</a>
    </Link>
  )
}

export default Links