import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index.js' // 1) index.js를 불러와서 router로 사용
import store from './store/index.js' // index.js를 생략하고 "./store" 만 쓸 수 있다. 
import loadImage from './plugins/loadImage'

createApp(App)
    .use(router)
    .use(store)
    .use(loadImage)
    .mount("#app") // 2) use(router) 추가, use() 는 Plugin 을 사용할 때 쓴다

// 3) routes 폴더를 생성하고 index.js 파일을 추가한다.
