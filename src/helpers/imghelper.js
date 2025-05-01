const getImageUrl = (path) => import.meta.env.BASE_URL + 'img/' + path;

const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = (err) => reject(new Error(`Failed to load image: ${url}`, { cause: err }));
      img.src = url;
    });
  }

const preloadAssets = async (criticalAssets) => {
    const promises = [];

    criticalAssets.forEach(asset => {
        // Проверяем, похоже ли на URL картинки
        if (/\.(jpe?g|png|gif|svg|webp)$/i.test(asset)) {
        promises.push(loadImage(asset));
        }
        // Проверяем, похоже ли на описание шрифта (простая проверка)
        else if (/\d+(\w+|%) \s*['"]?[\w\s-]+['"]?/.test(asset)) {
            try {
            promises.push(document.fonts.load(asset));
            } catch (error) {
            console.error(`Failed to start loading font: ${asset}`, error);
            // Можно решить, критична ли ошибка загрузки шрифта
            // promises.push(Promise.reject(error)); // если критична
            promises.push(Promise.resolve()); // если не критична
            }
        } else {
        console.warn(`Asset type not recognized for preloading: ${asset}`);
        }
    });

    await Promise.all(promises);
}

const waitForImageLoad = (imageElement) => {
    return new Promise((resolve, reject) => {
        if (imageElement.complete && imageElement.naturalHeight !== 0) {
            resolve();
        } else {
        imageElement.addEventListener('load', resolve, { once: true });
        imageElement.addEventListener('error', reject, { once: true });
        }
    });
}

export const imgHelper = {
    getImageUrl,
    loadImage,
    preloadAssets,
    waitForImageLoad
}