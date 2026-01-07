import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  onReset?: () => void
  onRequestPDF?: () => void
}

export const Header: FC<HeaderProps> = ({ onReset, onRequestPDF }) => {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/')
    if (onReset) {
      onReset()
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 lg:py-4 max-w-4xl">
        <div className="flex items-center justify-between gap-2">
          <div
            className="flex items-center gap-2 lg:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <span className="text-2xl lg:text-3xl">📝</span>
            <div>
              <h1 className="text-base lg:text-xl font-bold text-gray-900">Vista 文案健檢工具</h1>
              <p className="text-xs lg:text-sm text-gray-600 hidden sm:block">Vista's Copywriting Checker</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onRequestPDF && (
              <button
                onClick={onRequestPDF}
                className="btn-primary text-xs lg:text-sm px-3 lg:px-4 py-2 flex items-center gap-1 shadow-md hover:shadow-lg"
              >
                <span>📥</span>
                <span className="hidden sm:inline">免費下載</span>
                <span className="sm:hidden">下載</span>
              </button>
            )}
            <a
              href="https://iamvista.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark text-xs lg:text-sm font-medium transition-colors whitespace-nowrap px-3 py-2 rounded-lg hover:bg-primary/5 hidden md:block"
            >
              訂閱電子報
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
