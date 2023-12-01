import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
	plugins: [
		uni()
	],
	server: {
		port: 8080,
		proxy: {
			'/api': {
				target:  "http://134.175.108.202:12347", // 目标服务  
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ''),
			},
			'/class': {
				target:  "http://10.194.26.250:12346", // 目标服务  
				changeOrigin: true,
				rewrite: path => path.replace(/^\/class/, ''),
			}
		}
	}
})