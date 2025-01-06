import annoucementConfig from '../orchestrators/announcement.config.json';

interface AnnoucementConfig {
    title: string,
    description: string,
    primaryBtnText: string,
    secondaryBtnText: string,
}

const config: AnnoucementConfig = annoucementConfig;
const announcement = document.createElement('annoucement-component') as any;

announcement.title = config.title;
announcement.content = config.description;
announcement.primaryBtnText = config.primaryBtnText; 
announcement.secondaryBtnText = config.secondaryBtnText;

announcement.addEventListener('btn-press', () => {
    alert('Button pressed');
});

document.querySelector('#annoucement')?.appendChild(announcement);

setTimeout(async () => {
    await announcement.open();
}, 0);



