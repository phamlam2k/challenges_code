import { Link, NavLink } from 'react-router-dom'
import { MenuHeader } from 'src/models/common'
import { MENU_HEADER } from 'src/utils/common'
import { SearchIcon } from '../CustomIcons'

export const Header = () => {
  return (
    <div className="w-full bg-[#000]">
      <div className="container md:w-[1100px] flex justify-between mx-auto items-center h-[50px]">
        <Link to={'/'} className="text-[#FFFFFF]">
          Movie
        </Link>
        <ul className="flex text-[#FFFFFF] w-fit gap-[20px]">
          <li>
            <Link to="/search">
              <SearchIcon width={24} height={24} color="#FFF" />
            </Link>
          </li>
          {MENU_HEADER.map((item: MenuHeader) => (
            <li key={`${item.name}_${item.id}`}>
              <NavLink to={item.path} replace>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
