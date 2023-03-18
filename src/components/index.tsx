import { Header } from 'src/common/Header'

export const Layout = ({ children }: any) => {
  return (
    <div>
      <Header />
      <div className="mt-[100px]">{children}</div>
    </div>
  )
}
