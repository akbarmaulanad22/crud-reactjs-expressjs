import Header from '../Header'
import Sidebar from '../Sidebar'
import Content from '../Content'

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Content />
      </div>
    </div>
  )
}

export default MainLayout
