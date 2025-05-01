import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { imgHelper } from './helpers';

const criticalAssets = [
    imgHelper.getImageUrl('/eye_main.png'),
    imgHelper.getImageUrl('/lid-left.png'),
    imgHelper.getImageUrl('/lid-right.png'),
    imgHelper.getImageUrl('/header/low/photo_with_border.jpg'),
    imgHelper.getImageUrl('/title.svg'),
    imgHelper.getImageUrl('/main/low/1.jpg'),
    imgHelper.getImageUrl('/main/low/2.jpg'),
    imgHelper.getImageUrl('/main/low/4.jpg'),
    imgHelper.getImageUrl('/main/low/5.jpg'),
    imgHelper.getImageUrl('/main/low/6.jpg'),
    '1em GlebSalinFont',
  ];

imgHelper.preloadAssets(criticalAssets)
    .then(() => {
        console.log("assets preloaded")
        createApp(App)
        .use(router)
        .mount('#app')
    })

