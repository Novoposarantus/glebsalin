import {imgHelper} from './helpers';

const mainImagesConfig = [
    { low: imgHelper.getImageUrl('main/low/1.jpg'), high: imgHelper.getImageUrl('main/high/1.jpg'), alt: 'Image 1' },
    { low: imgHelper.getImageUrl('main/low/2.jpg'), high: imgHelper.getImageUrl('main/high/2.jpg'), alt: 'Image 2' },
    { low: imgHelper.getImageUrl('main/low/4.jpg'), high: imgHelper.getImageUrl('main/high/4.jpg'), alt: 'Image 4' },
    { low: imgHelper.getImageUrl('main/low/5.jpg'), high: imgHelper.getImageUrl('main/high/5.jpg'), alt: 'Image 5' },
    { low: imgHelper.getImageUrl('main/low/6.jpg'), high: imgHelper.getImageUrl('main/high/6.jpg'), alt: 'Image 6' }
]

const artworkGalleryImages = [
    // Первые два, которые ты добавил:
    { low: imgHelper.getImageUrl('artwork/low/1.jpg'), high: imgHelper.getImageUrl('artwork/high/1.jpg'), alt: 'Artwork 1' },
    { low: imgHelper.getImageUrl('artwork/low/2.jpg'), high: imgHelper.getImageUrl('artwork/high/2.jpg'), alt: 'Artwork 2' },
    { low: imgHelper.getImageUrl('artwork/low/Queen_of_Spades.jpg'), high: imgHelper.getImageUrl('artwork/high/Queen_of_Spades.jpg'), alt: 'Queen of Spades' },
    { low: imgHelper.getImageUrl('artwork/low/The_Lovers.png'), high: imgHelper.getImageUrl('artwork/high/The_Lovers.png'), alt: 'The Lovers' },
    { low: imgHelper.getImageUrl('artwork/low/IMG_4894.jpg'), high: imgHelper.getImageUrl('artwork/high/IMG_4894.jpg'), alt: 'IMG 4894' },
    { low: imgHelper.getImageUrl('artwork/low/8.jpg'), high: imgHelper.getImageUrl('artwork/high/8.jpg'), alt: 'Artwork 8' },
    { low: imgHelper.getImageUrl('artwork/low/9.jpg'), high: imgHelper.getImageUrl('artwork/high/9.jpg'), alt: 'Artwork 9' },
    { low: imgHelper.getImageUrl('artwork/low/deja_vu.jpg'), high: imgHelper.getImageUrl('artwork/high/deja_vu.jpg'), alt: 'deja vu' },
    { low: imgHelper.getImageUrl('artwork/low/Invisible_Monsters.png'), high: imgHelper.getImageUrl('artwork/high/Invisible_Monsters.png'), alt: 'Invisible Monsters' },
    { low: imgHelper.getImageUrl('artwork/low/IMG_9680.jpg'), high: imgHelper.getImageUrl('artwork/high/IMG_9680.jpg'), alt: 'IMG 9680' },
    { low: imgHelper.getImageUrl('artwork/low/3sisters1.jpg'), high: imgHelper.getImageUrl('artwork/high/3sisters1.jpg'), alt: '3sisters1' },
    { low: imgHelper.getImageUrl('artwork/low/11.png'), high: imgHelper.getImageUrl('artwork/high/11.png'), alt: 'Artwork 11' },
    { low: imgHelper.getImageUrl('artwork/low/3sisters2.jpg'), high: imgHelper.getImageUrl('artwork/high/3sisters2.jpg'), alt: '3sisters2' },
    { low: imgHelper.getImageUrl('artwork/low/10.png'), high: imgHelper.getImageUrl('artwork/high/10.png'), alt: 'Artwork 10' },
    { low: imgHelper.getImageUrl('artwork/low/SPRING.png'), high: imgHelper.getImageUrl('artwork/high/SPRING.png'), alt: 'SPRING' },
    { low: imgHelper.getImageUrl('artwork/low/Only_God_knows.png'), high: imgHelper.getImageUrl('artwork/high/Only_God_knows.png'), alt: 'Only God knows' },
    { low: imgHelper.getImageUrl('artwork/low/dopamine.jpg'), high: imgHelper.getImageUrl('artwork/high/dopamine.jpg'), alt: 'dopamine' },
    { low: imgHelper.getImageUrl('artwork/low/phantomas.png'), high: imgHelper.getImageUrl('artwork/high/phantomas.png'), alt: 'phantomas' },
    { low: imgHelper.getImageUrl('artwork/low/Depths.jpg'), high: imgHelper.getImageUrl('artwork/high/Depths.jpg'), alt: 'Depths' },
    { low: imgHelper.getImageUrl('artwork/low/medusa_dmt.png'), high: imgHelper.getImageUrl('artwork/high/medusa_dmt.png'), alt: 'medusa dmt' },
    { low: imgHelper.getImageUrl('artwork/low/Untitled.jpg'), high: imgHelper.getImageUrl('artwork/high/Untitled.jpg'), alt: 'Untitled' },
    { low: imgHelper.getImageUrl('artwork/low/Friday_the_13th.jpg'), high: imgHelper.getImageUrl('artwork/high/Friday_the_13th.jpg'), alt: 'Friday the 13th' },
    { low: imgHelper.getImageUrl('artwork/low/5.jpg'), high: imgHelper.getImageUrl('artwork/high/5.jpg'), alt: 'Artwork 5' },
    { low: imgHelper.getImageUrl('artwork/low/WHEEL_X.png'), high: imgHelper.getImageUrl('artwork/high/WHEEL_X.png'), alt: 'WHEEL X' },
    { low: imgHelper.getImageUrl('artwork/low/7.jpg'), high: imgHelper.getImageUrl('artwork/high/7.jpg'), alt: 'Artwork 7' },
    { low: imgHelper.getImageUrl('artwork/low/Enter_The_Void.jpg'), high: imgHelper.getImageUrl('artwork/high/Enter_The_Void.jpg'), alt: 'Enter The Void' },
    { low: imgHelper.getImageUrl('artwork/low/6.jpg'), high: imgHelper.getImageUrl('artwork/high/6.jpg'), alt: 'Artwork 6' },
    { low: imgHelper.getImageUrl('artwork/low/Justice.jpg'), high: imgHelper.getImageUrl('artwork/high/Justice.jpg'), alt: 'Justice' },
    { low: imgHelper.getImageUrl('artwork/low/Vacation.jpg'), high: imgHelper.getImageUrl('artwork/high/Vacation.jpg'), alt: 'Vacation' },
];

const openSarcophagusAnimationDuration = 1.5;
const sliderSpeed = 6;

export const config = {
    mainImagesConfig,
    openSarcophagusAnimationDuration,
    sliderSpeed,
    artworkGalleryImages
}