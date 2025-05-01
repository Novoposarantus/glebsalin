import {imgHelper} from './helpers';

const mainImagesConfig = [
    { low: imgHelper.getImageUrl('main/low/1.jpg'), high: imgHelper.getImageUrl('main/high/1.jpg'), alt: 'Image 1' },
    { low: imgHelper.getImageUrl('main/low/2.jpg'), high: imgHelper.getImageUrl('main/high/2.jpg'), alt: 'Image 2' },
    { low: imgHelper.getImageUrl('main/low/4.jpg'), high: imgHelper.getImageUrl('main/high/4.jpg'), alt: 'Image 4' },
    { low: imgHelper.getImageUrl('main/low/5.jpg'), high: imgHelper.getImageUrl('main/high/5.jpg'), alt: 'Image 5' },
    { low: imgHelper.getImageUrl('main/low/6.jpg'), high: imgHelper.getImageUrl('main/high/6.jpg'), alt: 'Image 6' }
]

const openSarcophagusAnimationDuration = 1.5;
const sliderSpeed = 6;

export const config = {
    mainImagesConfig,
    openSarcophagusAnimationDuration,
    sliderSpeed
}