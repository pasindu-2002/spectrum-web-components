import annoucementConfig from './banner.config.json';

interface AnnoucementConfig {
    title: string,
    content: string,
    btnText: string
}

const config: AnnoucementConfig = annoucementConfig;
const announcement = document.createElement('annoucement-component');

announcement.title = config.title;
announcement.content = config.content;
announcement.btnText = config.btnText; 

announcement.addEventListener('btn-press', () => {
    alert('Button pressed');
});

document.querySelector('#banner')?.appendChild(announcement);

setTimeout(async () => {
    await announcement.open();
}, 0);



