import { Cpu, Github, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900/90 border-t border-blue-800/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-blue-400">
              <Cpu className="h-8 w-8" />
              <span className="text-xl font-bold">敏捷芯片开发</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              探索芯片设计的敏捷之路，通过快速迭代、协作创新和持续验证，推动硬件开发进入新时代。
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">快速链接</h3>
            <div className="space-y-2">
              {[
                { name: '核心理念', href: '/philosophy' },
                { name: '发展历史', href: '/history' },
                { name: '关键项目', href: '/projects' },
                { name: '核心技术', href: '/technology' },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">联系我们</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Github className="h-4 w-4" />
                <span className="text-sm">GitHub 开源项目</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-4 w-4" />
                <span className="text-sm">学术交流合作</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800/30 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 敏捷芯片开发知识库. 致力于推动芯片设计方法论创新.
          </p>
        </div>
      </div>
    </footer>
  )
}
