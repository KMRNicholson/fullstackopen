interface HeaderProps {
  content: string
}

const Header = (props: HeaderProps) =>
  <h1>{ props.content }</h1>

export default Header;